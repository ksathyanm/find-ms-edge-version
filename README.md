# Find edge version

![Test windows status](https://github.com/ksathyanm/find-edge-version/workflows/test-windows/badge.svg)
![Test macOS status](https://github.com/ksathyanm/find-edge-version/workflows/test-macOS/badge.svg)
[![NPM Version](https://img.shields.io/npm/v/find-edge-version)](https://www.npmjs.com/package/find-edge-version)
[![Node.js Version](https://img.shields.io/node/v/find-edge-version)](https://nodejs.org/en/download/)
[![NPM Downloads](https://img.shields.io/npm/dw/find-edge-version)](https://www.npmjs.com/package/find-edge-version)
[![Known Vulnerabilities](https://snyk.io/test/npm/find-edge-version/badge.svg)](https://snyk.io/test/npm/find-edge-version)

Finds installed Edge version.

## Install

```bash
npm install find-edge-version
```

## Usage

```js
const findEdgeVersion = require("find-edge-version")

const example = async () => {
  const { path, version } = await findEdgeVersion()
  console.log(`Found \`${version}\` version of MS Edge browser at \`${path}\``)
}
example()
```
