const os = require("os")
const fs = require("fs")
const { join, normalize } = require("path")

const canAccess = (file) => {
  if (!file) {
    return false
  }
  try {
    fs.accessSync(file)
    return true
  } catch {
    return false
  }
}

const formEdgeCanaryAppPath = () => {
  const home = os.homedir()
  const exe = join(
      home,
      "AppData",
      "Local",
      "Microsoft",
      "Edge SxS",
      "Application",
      "msedge.exe",
  )
  return normalize(exe)
}

const win32 = (channel) => {
  const paths = {
    stable: () => {
      return normalize("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe")
    },
    beta: () => {
      return normalize("C:/Program Files (x86)/Microsoft/Edge Beta/Application/msedge.exe")
    },
    dev: () => {
      return normalize("C:/Program Files (x86)/Microsoft/Edge Dev/Application/msedge.exe")
    },
    canary: formEdgeCanaryAppPath,
  }
  const possiblePath = paths[channel]()
  if (canAccess(possiblePath)) {
    return possiblePath
  }
  return new Error(`Microsoft Edge (${channel}) not installed`)
}

const darwin = (channel) => {
  const installations = []
  const defaultAppPaths = [
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  ].filter(Boolean)
  for (const chromePath of defaultAppPaths) {
    if (canAccess(chromePath)) {
      installations.push(chromePath)
    }
  }
  return installations
}

module.exports = (channel = "stable") => {
  if (process.platform === "win32") {
    return win32(channel)
  }
  if (process.platform === "darwin") {
    return darwin(channel)
  }
  throw new Error("Unsupported platform " + process.platform)
}
