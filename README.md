# Find edge version

![Test windows status](https://github.com/ksathyanm/find-edge-version/workflows/test-windows/badge.svg)
![Test macOS status](https://github.com/ksathyanm/find-edge-version/workflows/test-macOS/badge.svg)

[![npm version](https://badge.fury.io/js/find-edge-version.svg)](https://badge.fury.io/js/find-edge-version)
[![Node.js version](https://img.shields.io/node/v/find-edge-version)](https://nodejs.org/en/download/)
[![npm downloads](https://img.shields.io/npm/dm/find-edge-version)](https://www.npmjs.com/package/find-edge-version)
[![Minified size](https://img.shields.io/bundlephobia/min/find-edge-version)](https://bundlephobia.com/result?p=find-edge-version)
[![Known vulnerabilities](https://snyk.io/test/npm/find-edge-version/badge.svg)](https://snyk.io/test/npm/find-edge-version)

> Finds installed Edge version.

## Install

```bash
npm install find-edge-version
```

## Usage

```js
const findEdgeVersion = require("find-edge-version")

const example = async () => {
  const { path, version } = await findEdgeVersion()
  console.log(`Found ${version} version of MS Edge browser at ${path}`)
}
example()
```

## API

### findEdgeVersion(channel?)

#### channel

Type: `string`\
Values:
- On Windows - `'stable' | 'beta' | 'dev' | 'canary'`
- On macOS - `'app' | 'stable' | 'beta' | 'dev' | 'canary'`

The default is the first available binary from above mentioned order.
