/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

let payloadURL = "";

if (document.querySelector("meta[name='cr-analytics-ovr']")) {
  payloadURL = document.querySelector("meta[name='cr-analytics-ovr']").content;
} else {
  payloadURL = "https://analytics.craftions.net/api/v1/analyze";
}

console.log("%cCraftions Analytics", "color: #ED4245; font-size: 2rem;");
console.log(
  "%cThank you for using Craftions Analytics",
  "color: #5865F2; font-size: 1.25rem;"
);
console.log("%cSending Payload to " + payloadURL + "...", "color: #FEE75C;");

fetch(payloadURL, {
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
  .then((j) => {
    console.log("%cPayload send successfully!", "color: #57F287;");
    console.log("Response: " + JSON.stringify(j));
  })
  .catch((err) => {
    console.log("%cPayload could not be sent!", "color: #ED4245;");
    console.log("Error: " + err);
  });
