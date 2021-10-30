/**
 * @author The Craftions Developers <github.com/CraftionsMC>
 * @copyright (c) 2018-2021 Craftions.net. All rights reserved.
 */

const fs = require("fs");
const path = require("path");
const os = require("os");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const uaParser = require("ua-parser-js");

const app = express();

if (!fs.existsSync(path.join(os.homedir(), ".craftions_analytics"))) {
  fs.mkdirSync(path.join(os.homedir(), ".craftions_analytics"));
}

if (
  !fs.existsSync(path.join(os.homedir(), ".craftions_analytics", "data.json"))
) {
  fs.writeFileSync(
    path.join(os.homedir(), ".craftions_analytics", "data.json"),
    ""
  );
}

app.use(cors());
app.use(bodyParser());

app.use(express.static(path.join(__dirname, "..", "dist")));

app.post("/api/v1/analyze", (req, res) => {
  if (req.body.data) {
    if (require("./checkPayloadSchema")(req.body.data)) {
      const data = JSON.parse(
        fs
          .readFileSync(
            path.join(os.homedir(), ".craftions_analytics", "data.json")
          )
          .toString()
      );
      if (!data[req.body.data["location"]["host"]]) {
        data[req.body.data["location"]["host"]] = {
          location: {
            protocol: req.body.data["location"].protocol,
            host: req.body.data["location"].host,
            path: req.body.data["location"].path,
            port: req.body.data["location"].port,
            origin: req.body.data["location"].origin,
            href: req.body.data["location"].href,
          },
          siteData: {
            title: [],
          },
          clientData: {
            browser: [],
            screenColors: [],
            language: [],
            darkMode: [],
          },
        };
      }

      data[req.body.data["location"]["host"]].siteData.title.push(
        req.body.data["siteData"]["title"]
      );
      data[req.body.data["location"]["host"]].clientData.browser.push(
        req.body.data["clientData"]["browser"]
      );
      data[req.body.data["location"]["host"]].clientData.screenColors.push(
        req.body.data["clientData"]["screenColors"]
      );
      data[req.body.data["location"]["host"]].clientData.language.push(
        req.body.data["clientData"]["language"]
      );
      data[req.body.data["location"]["host"]].clientData.darkMode.push(
        req.body.data["clientData"]["darkMode"]
      );

      fs.writeFileSync(
        path.join(os.homedir(), ".craftions_analytics", "data.json"),
        JSON.stringify(data)
      );
      res.end('{"error": false, "message": "Saved"}');
    } else {
      res.end('{"error": true, "message": "Invalid Request body"}');
    }
  } else {
    res.end('{"error": true, "message": "Invalid Request body"}');
  }
});

app.post("/api/v1/analytics", (req, res) => {
  if (req.body.host) {
    const data = JSON.parse(
      fs
        .readFileSync(
          path.join(os.homedir(), ".craftions_analytics", "data.json")
        )
        .toString()
    );

    if (data[req.body.host]) {
      if (req.body.raw) {
        res.end(
          JSON.stringify({
            error: false,
            data,
          })
        );
      } else {
        const obj = {
          url: "http://" + req.body.host,
          title: data[req.body.host]["siteData"].title,
        };

        const stats = {
          visits: 0,
          browser: {
            firefox: 0,
            chrome: 0,
            edge: 0,
            ie: 0,
            safari: 0,
            opera: 0,
            other: 0,
          },
          os: {
            ios: 0,
            android: 0,
            windows: 0,
            macos: 0,
            other: 0,
          },
          screenColors: {},
          languages: {},
          darkMode: {
            on: 0,
            off: 0,
          },
          percentages: {
            browser: {
              firefox: 0,
              chrome: 0,
              edge: 0,
              ie: 0,
              safari: 0,
              opera: 0,
              other: 0,
            },
            os: {
              ios: 0,
              android: 0,
              windows: 0,
              macos: 0,
              other: 0,
            },
            darkMode: {
              on: 0,
              off: 0,
            },
          },
        };

        data[req.body.host].clientData["browser"].forEach((ua) => {
          const instance = uaParser(ua);

          const browser = instance.browser.name;
          const os = instance.os.name;

          stats.visits++;

          if (browser.toLowerCase() === "firefox") {
            stats.browser.firefox++;
          } else if (browser.toLowerCase().includes("chrom")) {
            stats.browser.chrome++;
          } else if (browser.toLowerCase() === "edge") {
            stats.browser.edge++;
          } else if (browser.toLowerCase() === "ie") {
            stats.browser.ie++;
          } else if (browser.toLowerCase() === "safari") {
            stats.browser.safari++;
          } else if (browser.toLowerCase().includes("opera")) {
            stats.browser.opera++;
          } else {
            stats.browser.other++;
          }

          if (os.toLowerCase().includes("ios")) {
            stats.os.ios++;
          } else if (os.toLowerCase().includes("android")) {
            stats.os.android++;
          } else if (os.toLowerCase().includes("windows")) {
            stats.os.windows++;
          } else if (os.toLowerCase().includes("mac")) {
            stats.os.macos++;
          } else {
            stats.os.other++;
          }
        });

        data[req.body.host].clientData["screenColors"].forEach((color) => {
          if (stats.screenColors[color]) {
            stats.screenColors[color]++;
          } else {
            stats.screenColors[color] = 1;
          }
        });

        data[req.body.host].clientData["language"].forEach((language) => {
          if (stats.languages[language]) {
            stats.languages[language]++;
          } else {
            stats.languages[language] = 1;
          }
        });

        data[req.body.host].clientData["darkMode"].forEach((dMEnabled) => {
          if (dMEnabled) {
            stats.darkMode.on++;
          } else {
            stats.darkMode.off++;
          }
        });

        const firefoxPercentage = (stats.browser.firefox / stats.visits) * 100;
        const chromePercentage = (stats.browser.chrome / stats.visits) * 100;
        const edgePercentage = (stats.browser.edge / stats.visits) * 100;
        const iePercentage = (stats.browser.ie / stats.visits) * 100;
        const safariPercentage = (stats.browser.safari / stats.visits) * 100;
        const operaPercentage = (stats.browser.opera / stats.visits) * 100;
        const otherPercentageB = (stats.browser.other / stats.visits) * 100;

        stats.percentages.browser.firefox = firefoxPercentage;
        stats.percentages.browser.chrome = chromePercentage;
        stats.percentages.browser.edge = edgePercentage;
        stats.percentages.browser.ie = iePercentage;
        stats.percentages.browser.safari = safariPercentage;
        stats.percentages.browser.opera = operaPercentage;
        stats.percentages.browser.other = otherPercentageB;

        const iosPercentage = (stats.os.ios / stats.visits) * 100;
        const androidPercentage = (stats.os.android / stats.visits) * 100;
        const windowsPercentage = (stats.os.windows / stats.visits) * 100;
        const macPercentage = (stats.os.macos / stats.visits) * 100;
        const otherPercentageO = (stats.os.other / stats.visits) * 100;

        stats.percentages.os.ios = iosPercentage;
        stats.percentages.os.android = androidPercentage;
        stats.percentages.os.windows = windowsPercentage;
        stats.percentages.os.macos = macPercentage;
        stats.percentages.os.other = otherPercentageO;

        const darkModeOnPercentage = (stats.darkMode.on / stats.visits) * 100;
        const darkModeOffPercentage = (stats.darkMode.off / stats.visits) * 100;

        stats.percentages.darkMode.on = darkModeOnPercentage;
        stats.percentages.darkMode.off = darkModeOffPercentage;

        res.end(
          JSON.stringify({
            error: false,
            message: stats,
          })
        );
      }
    } else {
      res.end('{"error": true, "message": "Not analyzed."}');
    }
  } else {
    res.end('{"error": true, "message": "Invalid Request body"}');
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(3000, "0.0.0.0");
