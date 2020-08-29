/* eslint-env mocha */
const { expect } = require("chai")
const findEdgeVersion = require("./index.js")

describe("find edge version", () => {
  it("finds edge version", async () => {
    try {
      const edgeVersion = await findEdgeVersion()
      console.log(edgeVersion)
      expect(edgeVersion).to.exist
      expect(edgeVersion).to.not.be.empty
      expect(edgeVersion).to.be.a("string")
      expect(edgeVersion).to.match(/^\d+.\d+.\d+.\d+$/)
    } catch (error) {
      console.log(error)
      throw error
    }
  })
})
