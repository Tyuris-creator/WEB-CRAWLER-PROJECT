const { normalize, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalize empty", () => {
  const input = "";
  const actual = normalize(input);
  const expected = "";
  expect(actual).toEqual(expected);
});

test("normalize github", () => {
  const input = "https://github.com/Tyuris-creator";
  const actual = normalize(input);
  const expected = "github.com/Tyuris-creator";
  expect(actual).toEqual(expected);
});

test("getUrl absolute", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;
  const inputBaseURL = "https://blog.boot.dev/path/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getUrl relative", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("getUrl relative", () => {
  const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev Blog
            </a>
            <a href="/path2/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;
  const inputBaseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"];
  expect(actual).toEqual(expected);
});
