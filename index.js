const os = require("os")
const fs = require("fs")
const { execFileSync } = require("child_process")
const { dirname, join, normalize } = require("path")

const versionRegEx = /\d+.\d+.\d+.\d+/

const canAccess = (file) => {
  try {
    fs.accessSync(file)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const windows = (channel) => {
  const path = (() => {
    const paths = {
      stable: normalize("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"),
      beta: normalize("C:/Program Files (x86)/Microsoft/Edge Beta/Application/msedge.exe"),
      dev: normalize("C:/Program Files (x86)/Microsoft/Edge Dev/Application/msedge.exe"),
      canary: normalize(join(os.homedir(), "AppData/Local/Microsoft/Edge SxS/Application/msedge.exe")),
    }
    const possiblePaths = channel ? [paths[channel]] : Object.values(paths)
    for (const possiblePath of possiblePaths) {
      if (possiblePath && canAccess(possiblePath)) {
        return possiblePath
      }
    }
    throw new Error("Unable to find or access")
  })()
  const version = (() => {
    const applicationFolder = dirname(path)
    const contents = fs.readdirSync(applicationFolder)
    return contents.find((name) => versionRegEx.test(name))
  })()
  return { path, version }
}

const macos = (channel) => {
  const path = (() => {
    const paths = {
      app: "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
      stable: "edge",
      canary: "edge-canary",
      beta: "edge-beta",
      dev: "edge-dev",
    }
    const possiblePaths = channel ? [paths[channel]] : Object.values(paths)
    for (const possiblePath of possiblePaths) {
      if (possiblePath && canAccess(possiblePath)) {
        return possiblePath
      }
    }
    throw new Error("Unable to find or access")
  })()
  const version = (() => {
    const output = execFileSync(path, ["--version"], { encoding: "utf-8" })
    return output.match(versionRegEx)[0]
  })()
  return { path, version }
}

const linux = () => {
  throw new Error("Unsupported platform " + process.platform)
}

module.exports = (() => {
  switch (process.platform) {
    case "darwin":
      return macos
    case "win32":
      return windows
    default:
      return linux
  }
})()
