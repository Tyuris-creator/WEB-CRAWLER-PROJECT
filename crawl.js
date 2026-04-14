const { JSDOM } = require("jsdom");

const crawlPage = async (currentURL) => {
  console.log(`Actively crawling: ${currentURL}`);
  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(
        `error in fetch with status code ${resp.status} on page: ${currentURL}`,
      );
      return;
    }
    const contentType = resp.headers.get("content-type");
    if (contentType.includes("text/html")) {
      console.log(
        `non html response: content type ${contentType}, on page: ${currentURL}`,
      );
    }
    console.log(await resp.text());
  } catch (err) {
    console.log(`error in fetch ${err.message}`);
  }
};

const getURLsFromHTML = (htmlBody, baseURL) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkedElements = dom.window.document.querySelectorAll("a");
  console.log(linkedElements);
  for (const linkEl of linkedElements) {
    if (linkEl.href.slice(0, 1) === "/") {
      // relative
      try {
        const urlObj = new URL(`${baseURL}${linkEl.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with relative url: ${err.message}`);
      }
    } else {
      // absolute
      try {
        const urlObj = new URL(`${linkEl.href}`);
        urls.push(urlObj.href);
      } catch (err) {
        console.log(`Error with absolute url: ${err.message}`);
      }
    }
  }
  return urls;
};

const normalize = (url) => {
  if (url === "") {
    return "";
  }
  const urlObj = new URL(url);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  } else {
    return hostPath;
  }
};

module.exports = {
  normalize,
  getURLsFromHTML,
  crawlPage,
};
