const os = require("os")
const fs = require("fs")
const { execFileSync } = require("child_process")
const { dirname, join } = require("path")

const versionRegEx = /\d+.\d+.\d+.\d+/

const canAccess = (file) => {
  try {
    fs.accessSync(file)
    return true
  } catch (error) {
    return false
  }
}

const findPath = (paths, channel) => {
  if (channel && !paths[channel]) {
    const printedList = JSON.stringify(Object.keys(paths))
    throw new Error(`Expected string \`channel\` to be one of \`${printedList}\`, got \`${channel}\``)
  }
  const possiblePaths = channel ? [paths[channel]] : Object.values(paths)
  const path = possiblePaths.find((possiblePath) => canAccess(possiblePath))
  if (path) {
    return path
  }
  throw new Error("MS Edge browser is not found")
}

const windows = (channel) => {
  const paths = {
    stable: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    beta: "C:\\Program Files (x86)\\Microsoft\\Edge Beta\\Application\\msedge.exe",
    dev: "C:\\Program Files (x86)\\Microsoft\\Edge Dev\\Application\\msedge.exe",
    canary: join(os.homedir(), "AppData\\Local\\Microsoft\\Edge SxS\\Application\\msedge.exe"),
  }
  const path = findPath(paths, channel)
  const applicationFolder = dirname(path)
  const contents = fs.readdirSync(applicationFolder)
  const version = contents.find((name) => versionRegEx.test(name))
  return { path, version }
}

const macos = (channel) => {
  const paths = {
    app: "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    stable: "edge",
    beta: "edge-beta",
    dev: "edge-dev",
    canary: "edge-canary",
  }
  const path = findPath(paths, channel)
  const output = execFileSync(path, ["--version"], { encoding: "utf-8" })
  const version = output.match(versionRegEx)[0]
  return { path, version }
}

const linux = () => {
  throw new Error(`Unsupported platform \`${process.platform}\``)
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
