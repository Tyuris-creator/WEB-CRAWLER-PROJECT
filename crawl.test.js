const {normalize} = require("./crawl.js")
const {test, expect} = require("@jest/globals")

test("normalize empty", () => {
    const input = ""
    const actual = normalize(input)
    const expected = ""
    expect(actual).toEqual(expected)
})

test("normalize github", () => {
    const input = "https://github.com/Tyuris-creator"
    const actual = normalize(input)
    const expected = "github.com/Tyuris-creator"
    expect(actual).toEqual(expected)
})