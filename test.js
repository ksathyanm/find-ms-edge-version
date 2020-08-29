/* eslint-env mocha */
const { expect } = require("chai")
const findEdgeVersion = require("./index.js")

describe("find edge version", () => {
  it("finds edge version", async () => {
    try {
      const { path, version } = await findEdgeVersion()
      console.log(`Path: ${path}`)
      console.log(`Version: ${version}`)
      expect(version).to.exist
      expect(version).to.not.be.empty
      expect(version).to.be.a("string")
      expect(version).to.match(/^\d+.\d+.\d+.\d+$/)
    } catch (error) {
      console.log(error)
      throw error
    }
  })
})
