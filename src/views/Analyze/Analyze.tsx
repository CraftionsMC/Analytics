/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import * as React from "react";
import { useEffect } from "react";
import { Button } from "react-bulma-components";
import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  Decimation,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  LogarithmicScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  SubTitle,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

interface Stats {
  visits: number;
  browser: {
    firefox: number;
    chrome: number;
    edge: number;
    ie: number;
    safari: number;
    opera: number;
    other: number;
  };
  os: {
    ios: number;
    android: number;
    windows: number;
    macos: number;
    other: number;
  };
  screenColors: {
    "24-bit": number;
  };
  languages: {
    de: number;
    "de-DE": number;
  };
  darkMode: {
    on: number;
    off: number;
  };
  percentages: {
    browser: {
      firefox: number;
      chrome: number;
      edge: number;
      ie: number;
      safari: number;
      opera: number;
      other: number;
    };
    os: {
      ios: number;
      android: number;
      windows: number;
      macos: number;
      other: number;
    };
    darkMode: {
      on: number;
      off: number;
    };
  };
}

export default function Analyze() {
  const usp = new URLSearchParams(location.search);
  if (usp.has("host")) {
    useEffect(() => {
      downloadData(
        usp.get("host") as string,
        (success: boolean, stats: Stats | null) => {
          if (stats !== null) {
            (document.querySelector("#total-visits") as HTMLElement).innerText =
              stats.visits.toString();

            // browsers
            {
              let browserXValues = [
                "Firefox",
                "Chrome",
                "Edge",
                "IE",
                "Safari",
                "Opera",
                "Other",
              ];
              let browserYValues = [
                stats.percentages.browser.firefox,
                stats.percentages.browser.chrome,
                stats.percentages.browser.edge,
                stats.percentages.browser.ie,
                stats.percentages.browser.safari,
                stats.percentages.browser.opera,
                stats.percentages.browser.other,
              ];

              let browserColors = [
                "#CD3D00",
                "#0F9855",
                "#217BCD",
                "#F4B104",
                "#0091BE",
                "#FF1B2D",
                "#727272",
              ];

              new Chart("analyze-browsers", {
                type: "doughnut",
                data: {
                  labels: browserXValues,
                  datasets: [
                    {
                      backgroundColor: browserColors,
                      data: browserYValues,
                    },
                  ],
                },
                options: {
                  plugins: {
                    title: {
                      display: true,
                      text: "Browsers",
                    },
                  },
                },
              });
              (
                document.querySelector("#analyze-browsers") as HTMLElement
              ).classList.remove("is-hidden");
            }
            // os
            {
              let osXValues = ["iOS", "Android", "Windows", "MacOS", "Other"];
              let osYValues = [
                stats.percentages.os.ios,
                stats.percentages.os.android,
                stats.percentages.os.windows,
                stats.percentages.os.macos,
                stats.percentages.os.other,
              ];

              let osColors = [
                "#2E3033",
                "#2FD37D",
                "#0061F2",
                "#000000",
                "#727272",
              ];

              new Chart("analyze-os", {
                type: "doughnut",
                data: {
                  labels: osXValues,
                  datasets: [
                    {
                      backgroundColor: osColors,
                      data: osYValues,
                    },
                  ],
                },
                options: {
                  plugins: {
                    title: {
                      display: true,
                      text: "Operating Systems",
                    },
                  },
                },
              });
              (
                document.querySelector("#analyze-os") as HTMLElement
              ).classList.remove("is-hidden");
            }

            // darkmode
            {
              let dmXValues = ["Darkmode", "Lightmode"];
              let dmYValues = [
                stats.percentages.darkMode.on,
                stats.percentages.darkMode.off,
              ];

              let dmColors = ["#000000", "#FFFFFF"];

              new Chart("analyze-theme", {
                type: "doughnut",
                data: {
                  labels: dmXValues,
                  datasets: [
                    {
                      backgroundColor: dmColors,
                      data: dmYValues,
                    },
                  ],
                },
                options: {
                  plugins: {
                    title: {
                      display: true,
                      text: "Theme",
                    },
                  },
                },
              });
              (
                document.querySelector("#analyze-theme") as HTMLElement
              ).classList.remove("is-hidden");
            }
          }
        }
      );
    }, []);
    return (
      <>
        <h1 className="has-text-centered title">
          Analytics for {usp.get("host") as string}
        </h1>
        <h2 className="has-text-centered subtitle">
          Total visits: <span id="total-visits">loading...</span>
        </h2>
        <div className="has-text-centered">
          <canvas
            id="analyze-browsers"
            className={"is-hidden"}
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "100%",
              maxHeight: "600px",
              display: "inline-block",
            }}
          />
          <canvas
            id="analyze-os"
            className={"is-hidden"}
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "100%",
              maxHeight: "600px",
              display: "inline-block",
            }}
          />
          <canvas
            id="analyze-theme"
            className={"is-hidden"}
            style={{
              width: "100%",
              maxWidth: "600px",
              height: "100%",
              maxHeight: "600px",
              display: "inline-block",
            }}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1 className="has-text-centered title">
          Analyze
          <br />
          <p
            className={"mt-4 has-text-danger subtitle is-hidden"}
            id={"analyze-status"}
          >
            The Site was not analyzed yet!
          </p>
          <label className={"label mt-3"}>
            Enter the Domain of the webpage (e.g. craftions.net)
          </label>
          <input
            type="url"
            className="input"
            placeholder={"Domain"}
            style={{ width: "25%" }}
            id={"analyze-url-input"}
          />
          <br />
          <Button
            color={"link"}
            className={"mt-2"}
            onClick={() => {
              const host = (
                document.querySelector("#analyze-url-input") as HTMLInputElement
              ).value;
              window.location.assign("?host=" + host);
            }}
          >
            Analyze
          </Button>
        </h1>
      </>
    );
  }
}

function downloadData(host: string, callback: Function) {
  fetch("/api/v1/analytics", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      host: host,
    }),
  })
    .then((r) => r.json())
    .then((j) => {
      console.log("%cPayload received successfully!", "color: #57F287;");
      if (j.error) {
        console.log(
          "%cThe host " + host + " was not analyzed yet.",
          "color: #ED4245;"
        );
      } else {
        console.log("Response: " + JSON.stringify(j));
      }
      callback(!j.error, j.message);
    })
    .catch((err) => {
      console.log("%cPayload not received successfully!", "color: #ED4245;");
      console.log("Response: " + err);
    });
}
