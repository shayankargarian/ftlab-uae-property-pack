/* FTLAB UAE Property reading pack — charts */
(function () {
  "use strict";

  const DATA = {
    runId: "2026-09-13-uae-property",
    date: "2026-09-13",
    opportunityScores: [
      { id: "T02", name: "T02 Strata/OC finance OS", score: 87, highlight: true },
      { id: "T01", name: "T01 Escrow-native Dev OS", score: 81, highlight: true },
      { id: "T03", name: "T03 Industrial RE intel", score: 80, highlight: true },
      { id: "T04", name: "T04 Progress AI escrow", score: 77, highlight: false },
      { id: "T06", name: "T06 Hard-FM predictive", score: 77, highlight: false },
      { id: "T10", name: "T10 Service-charge rail", score: 76, highlight: false },
      { id: "T08", name: "T08 Multi-emirate RegTech", score: 75, highlight: false },
      { id: "T13", name: "T13 KSA construction suite", score: 74, highlight: false },
      { id: "T07", name: "T07 Digital handover", score: 72, highlight: false },
      { id: "T19", name: "T19 AR–EN document AI", score: 71, highlight: false },
      { id: "T05", name: "T05 Mid-market landlord OS", score: 70, highlight: false },
      { id: "T09", name: "T09 Vertical AVM stack", score: 69, highlight: false }
    ],
    scoreHaircut: {
      labels: ["T02", "T01", "T03"],
      stage1: [87, 81, 80],
      underwriter: [55, 48, 47],
      referee: [46, 39, 36]
    },
    gate2: {
      labels: ["PILOT", "WATCH"],
      counts: [1, 2],
      cards: [
        { id: "T02", decision: "PILOT", score: 46, evidence: "C" },
        { id: "T01", decision: "WATCH", score: 39, evidence: "C" },
        { id: "T03", decision: "WATCH", score: 36, evidence: "D" }
      ]
    },
    evidenceStrength: {
      labels: ["Proven", "Soft", "Unknown"],
      values: [8, 45, 9]
    },
    evidenceKind: {
      labels: ["fact", "estimate", "unknown", "inference", "hypothesis", "opinion", "prediction"],
      values: [36, 10, 8, 4, 2, 1, 1]
    },
    capital: {
      labels: ["T02 PILOT-0", "T01 paper", "T03 scout", "Reserve"],
      values: [75, 10, 5, 10],
      note: "Illustrative attention shares from Stage 3 (~70–80% T02). Not AED figures."
    },
    adMarket: {
      labels: ["ADREC YE2025", "ADREC H1 2026"],
      values: [142, 117],
      unit: "AED bn",
      strength: "Proven",
      refs: ["E065", "E069"]
    },
    radar: {
      labels: [
        "Attractiveness",
        "WTP",
        "Market size",
        "Growth / timing",
        "White space",
        "UAE/GCC adv",
        "Exportability",
        "Economics",
        "Feasibility",
        "Regulatory",
        "Defensibility"
      ],
      T02: [11, 10, 8, 8, 7, 10, 6, 8, 7, 5, 7],
      T01: [10, 10, 8, 7, 4, 10, 7, 8, 7, 5, 5],
      T03: [10, 9, 7, 7, 7, 9, 7, 8, 6, 3, 7]
    }
  };

  window.FTLAB_CHART_DATA = DATA;

  const gold = "#c9a227";
  const goldSoft = "#d4af6a";
  const teal = "#3d9b8f";
  const tealSoft = "#5cb8ab";
  const risk = "#c45c5c";
  const muted = "#9a968c";
  const grid = "rgba(255,255,255,0.05)";
  const tick = "#6b6760";

  function basePlugins(title) {
    return {
      legend: {
        labels: { color: muted, font: { family: "'DM Sans', sans-serif", size: 12 }, boxWidth: 12, padding: 14 }
      },
      tooltip: {
        backgroundColor: "rgba(20,24,32,0.95)",
        titleColor: goldSoft,
        bodyColor: "#e8e6e1",
        borderColor: "rgba(212,175,106,0.25)",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 10
      },
      title: title
        ? { display: true, text: title, color: muted, font: { size: 12, weight: "500" }, padding: { bottom: 8 } }
        : undefined
    };
  }

  function scaleDefaults() {
    return {
      grid: { color: grid, drawBorder: false },
      ticks: { color: tick, font: { size: 11 } },
      border: { display: false }
    };
  }

  function barRadius() {
    return { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 };
  }

  function initCharts() {
    if (typeof Chart === "undefined") {
      console.warn("Chart.js not loaded");
      return;
    }

    Chart.defaults.font.family = "'DM Sans', system-ui, sans-serif";
    Chart.defaults.color = muted;
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;
    const narrow = window.matchMedia("(max-width: 639px)").matches;
    if (narrow) {
      Chart.defaults.font.size = 11;
    }

    // 1. Opportunity universe — horizontal bar
    const oppCtx = document.getElementById("chart-opportunity");
    if (oppCtx) {
      const labels = DATA.opportunityScores.map((d) => d.id + "  " + d.name.replace(/^T\d+\s/, "").slice(0, narrow ? 16 : 28));
      const scores = DATA.opportunityScores.map((d) => d.score);
      const colors = DATA.opportunityScores.map((d) =>
        d.id === "T02" ? gold : d.highlight ? tealSoft : "rgba(154,150,140,0.55)"
      );
      new Chart(oppCtx, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            label: "Stage 1 score",
            data: scores,
            backgroundColor: colors,
            borderSkipped: false,
            borderRadius: 4,
            barThickness: 18
          }]
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            ...basePlugins(),
            legend: { display: false },
            tooltip: {
              ...basePlugins().tooltip,
              callbacks: {
                title: (items) => DATA.opportunityScores[items[0].dataIndex].name,
                label: (item) => "Score: " + item.raw
              }
            }
          },
          scales: {
            x: { ...scaleDefaults(), suggestedMax: 100, title: { display: true, text: "Stage 1 score", color: tick } },
            y: { ...scaleDefaults(), grid: { display: false } }
          }
        }
      });
    }

    // 2. Score haircut — grouped bar
    const hairCtx = document.getElementById("chart-haircut");
    if (hairCtx) {
      new Chart(hairCtx, {
        type: "bar",
        data: {
          labels: DATA.scoreHaircut.labels,
          datasets: [
            {
              label: "Stage 1",
              data: DATA.scoreHaircut.stage1,
              backgroundColor: "rgba(154,150,140,0.45)",
              borderRadius: barRadius(),
              borderSkipped: false
            },
            {
              label: "Underwriter",
              data: DATA.scoreHaircut.underwriter,
              backgroundColor: teal,
              borderRadius: barRadius(),
              borderSkipped: false
            },
            {
              label: "Referee G2",
              data: DATA.scoreHaircut.referee,
              backgroundColor: gold,
              borderRadius: barRadius(),
              borderSkipped: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: basePlugins(),
          scales: {
            x: { ...scaleDefaults(), grid: { display: false } },
            y: { ...scaleDefaults(), suggestedMax: 100, title: { display: true, text: "Score", color: tick } }
          }
        }
      });
    }

    // 3. Gate 2 doughnut
    const gateCtx = document.getElementById("chart-gate2");
    if (gateCtx) {
      new Chart(gateCtx, {
        type: "doughnut",
        data: {
          labels: DATA.gate2.labels,
          datasets: [{
            data: DATA.gate2.counts,
            backgroundColor: [teal, "rgba(139,126,200,0.75)"],
            borderColor: "#141820",
            borderWidth: 3,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "62%",
          plugins: {
            ...basePlugins(),
            tooltip: {
              ...basePlugins().tooltip,
              callbacks: { label: (i) => i.label + ": " + i.raw + " thesis" }
            }
          }
        }
      });
    }

    // 4. Evidence strength pie
    const strCtx = document.getElementById("chart-evidence-strength");
    if (strCtx) {
      new Chart(strCtx, {
        type: "pie",
        data: {
          labels: DATA.evidenceStrength.labels,
          datasets: [{
            data: DATA.evidenceStrength.values,
            backgroundColor: [tealSoft, goldSoft, risk],
            borderColor: "#141820",
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            ...basePlugins(),
            tooltip: {
              ...basePlugins().tooltip,
              callbacks: {
                label: (i) => {
                  const t = DATA.evidenceStrength.values.reduce((a, b) => a + b, 0);
                  return i.label + ": " + i.raw + " (" + Math.round((i.raw / t) * 100) + "%)";
                }
              }
            }
          }
        }
      });
    }

    // 5. Evidence kind doughnut / bar
    const kindCtx = document.getElementById("chart-evidence-kind");
    if (kindCtx) {
      new Chart(kindCtx, {
        type: "bar",
        data: {
          labels: DATA.evidenceKind.labels,
          datasets: [{
            label: "Claims",
            data: DATA.evidenceKind.values,
            backgroundColor: [
              teal,
              gold,
              risk,
              "rgba(139,126,200,0.7)",
              "rgba(201,162,39,0.45)",
              "rgba(154,150,140,0.5)",
              "rgba(196,92,92,0.55)"
            ],
            borderRadius: barRadius(),
            borderSkipped: false,
            barThickness: 28
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { ...basePlugins(), legend: { display: false } },
          scales: {
            x: { ...scaleDefaults(), grid: { display: false } },
            y: { ...scaleDefaults(), beginAtZero: true, ticks: { ...scaleDefaults().ticks, stepSize: 5 } }
          }
        }
      });
    }

    // 6. Capital posture doughnut
    const capCtx = document.getElementById("chart-capital");
    if (capCtx) {
      new Chart(capCtx, {
        type: "doughnut",
        data: {
          labels: DATA.capital.labels,
          datasets: [{
            data: DATA.capital.values,
            backgroundColor: [gold, "rgba(139,126,200,0.7)", teal, "rgba(154,150,140,0.4)"],
            borderColor: "#141820",
            borderWidth: 3,
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "58%",
          plugins: {
            ...basePlugins(),
            tooltip: {
              ...basePlugins().tooltip,
              callbacks: { label: (i) => i.label + ": ~" + i.raw + "%" }
            }
          }
        }
      });
    }

    // 7. AD market scale bar
    const adCtx = document.getElementById("chart-ad-market");
    if (adCtx) {
      new Chart(adCtx, {
        type: "bar",
        data: {
          labels: DATA.adMarket.labels,
          datasets: [{
            label: "AED bn",
            data: DATA.adMarket.values,
            backgroundColor: [teal, gold],
            borderRadius: barRadius(),
            borderSkipped: false,
            barThickness: 56
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            ...basePlugins(),
            legend: { display: false },
            tooltip: {
              ...basePlugins().tooltip,
              callbacks: {
                label: (i) => i.raw + " AED bn · Proven (" + DATA.adMarket.refs[i.dataIndex] + ")"
              }
            }
          },
          scales: {
            x: { ...scaleDefaults(), grid: { display: false } },
            y: {
              ...scaleDefaults(),
              beginAtZero: true,
              title: { display: true, text: "AED billion", color: tick }
            }
          }
        }
      });
    }

    // 8. Radar dimensions
    const radarCtx = document.getElementById("chart-radar");
    if (radarCtx) {
      new Chart(radarCtx, {
        type: "radar",
        data: {
          labels: DATA.radar.labels,
          datasets: [
            {
              label: "T02",
              data: DATA.radar.T02,
              borderColor: gold,
              backgroundColor: "rgba(201,162,39,0.18)",
              pointBackgroundColor: gold,
              pointBorderColor: "#141820",
              borderWidth: 2
            },
            {
              label: "T01",
              data: DATA.radar.T01,
              borderColor: "rgba(139,126,200,0.85)",
              backgroundColor: "rgba(139,126,200,0.08)",
              pointBackgroundColor: "#8b7ec8",
              pointBorderColor: "#141820",
              borderWidth: 1.5
            },
            {
              label: "T03",
              data: DATA.radar.T03,
              borderColor: tealSoft,
              backgroundColor: "rgba(61,155,143,0.08)",
              pointBackgroundColor: tealSoft,
              pointBorderColor: "#141820",
              borderWidth: 1.5
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: basePlugins(),
          scales: {
            r: {
              min: 0,
              max: 12,
              ticks: { display: false, stepSize: 2 },
              grid: { color: grid },
              angleLines: { color: grid },
              pointLabels: {
                color: muted,
                font: { size: narrow ? 8 : 10, family: "'DM Sans', sans-serif" }
              }
            }
          }
        }
      });
    }
  }

  function initNav() {
    const links = document.querySelectorAll(".nav-links a");
    const sections = [...links]
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);

    function onScroll() {
      const y = window.scrollY + 80;
      let current = sections[0];
      for (const s of sections) {
        if (s.offsetTop <= y) current = s;
      }
      links.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current.id);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function initMermaid() {
    if (typeof mermaid === "undefined") return;
    mermaid.initialize({
      startOnLoad: true,
      theme: "dark",
      securityLevel: "loose",
      flowchart: { curve: "basis", htmlLabels: true, padding: 12 },
      themeVariables: {
        darkMode: true,
        background: "#171c26",
        primaryColor: "#2a2418",
        primaryTextColor: "#e8e6e1",
        primaryBorderColor: "#c9a227",
        lineColor: "#9a968c",
        secondaryColor: "#1a2a28",
        tertiaryColor: "#1c2230",
        fontFamily: "DM Sans, sans-serif"
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initMermaid();
    initCharts();
    initNav();
  });
})();
