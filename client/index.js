/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

fetch("/api/v1/analyze", {
  method: "POST",
  mode: "cors",
  cache: "no-cache",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
  body: JSON.stringify({
    data: {
      version: "1.0",
      location: {
        protocol: location.protocol,
        host: location.host,
        path: location.pathname,
        port: location.port,
        origin: location.origin,
        href: location.href,
      },
      siteData: {
        title: document.title,
      },
      clientData: {
        browser: navigator.userAgent,
        screenColors: screen.colorDepth + "-bit",
        language: navigator.language,
        darkMode:
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches,
      },
    },
  }),
})
  .then((r) => r.json())
  .then((j) => console.log(j));
