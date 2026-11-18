const toggleBtn = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Printable CV Preview & Print Trigger
const cvPrintBtn = document.getElementById("cv-print-btn");
const cvModal = document.getElementById("cv-modal");
const cvModalClose = document.getElementById("cv-modal-close");
const cvTriggerPrint = document.getElementById("cv-trigger-print");

function openCvModal() {
  if (!cvModal) return;
  cvModal.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
  if (cvTriggerPrint) cvTriggerPrint.focus();
}

function closeCvModal() {
  if (!cvModal) return;
  cvModal.setAttribute("hidden", "");
  document.body.style.overflow = "";
}

if (cvPrintBtn) {
  cvPrintBtn.addEventListener("click", openCvModal);
}

if (cvModalClose) {
  cvModalClose.addEventListener("click", closeCvModal);
}

if (cvModal) {
  cvModal.addEventListener("click", (event) => {
    if (event.target === cvModal) {
      closeCvModal();
    }
  });
}

if (cvTriggerPrint) {
  cvTriggerPrint.addEventListener("click", () => {
    window.print();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cvModal && !cvModal.hasAttribute("hidden")) {
    closeCvModal();
  }
});

// Project Category Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selected = btn.getAttribute("data-filter") || "all";

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    projectCards.forEach((card) => {
      const categories = (card.getAttribute("data-category") || "").split(" ");
      const shouldShow = selected === "all" || categories.includes(selected);
      if (shouldShow) {
        card.removeAttribute("hidden");
      } else {
        card.setAttribute("hidden", "");
      }
    });
  });
});

// Case Study Modal
const caseStudies = {
  sales: {
    meta: "01 · Excel · Business Analysis",
    title: "Sales Performance Analysis",
    summary:
      "Analyzed a multi-region retail sales dataset to uncover which product categories and territories generate the strongest profit margins.",
    question:
      "Which product lines and regional markets drive the highest net profit, and where are discounts eroding margin?",
    approach:
      "Cleaned raw transaction rows in Excel, standardized product categories, and built Pivot Tables with dynamic KPI slicers for regional comparisons.",
    findings: [
      "Top 20% of SKUs accounted for the majority of net profit across primary regions.",
      "High-discount promotional periods lifted unit volume but reduced overall contribution margin.",
      "Summarized quarterly trends in a single-screen dashboard for non-technical stakeholders.",
    ],
  },
  churn: {
    meta: "02 · SQL · Retention Analytics",
    title: "Customer Churn Insights",
    summary:
      "Explored customer tenure, billing history, and engagement behavior to identify early churn signals and practical retention actions.",
    question:
      "What behavioral and account attributes differentiate retained customers from accounts that churn within their first year?",
    approach:
      "Wrote SQL queries using joins, CTEs, and conditional aggregations to segment customers by tenure, plan tier, and support interactions.",
    findings: [
      "Month-to-month subscribers showed substantially higher early-stage churn than annual plan holders.",
      "Low engagement within the first 60 days was the strongest behavioral warning sign.",
      "Recommended onboarding check-ins and annual upgrade incentives focused on at-risk cohorts.",
    ],
  },
  regional: {
    meta: "03 · Power BI & Tableau · Operations KPI",
    title: "Regional Revenue & Margin Tracker",
    summary:
      "Designed an executive-ready BI report comparing monthly revenue velocity against regional targets to spot underperforming categories early.",
    question:
      "How are regional sales teams pacing against monthly revenue targets, and which categories require inventory rebalancing?",
    approach:
      "Structured cleaned sales and target tables in Power BI, modeled date hierarchies, and paired variance KPIs with drill-down regional charts.",
    findings: [
      "Highlighted seasonal dips across secondary regions two weeks earlier than static monthly spreadsheets.",
      "Grouped variance drivers by category so managers could inspect root causes in two clicks.",
      "Standardized metric definitions across revenue, gross margin, and target attainment.",
    ],
  },
};

const modal = document.getElementById("project-modal");
const modalMeta = document.getElementById("modal-meta");
const modalTitle = document.getElementById("modal-title");
const modalSummary = document.getElementById("modal-summary");
const modalQuestion = document.getElementById("modal-question");
const modalApproach = document.getElementById("modal-approach");
const modalFindings = document.getElementById("modal-findings");
const modalClose = document.getElementById("modal-close");

function openCaseStudy(key) {
  const study = caseStudies[key];
  if (!study || !modal) return;

  modalMeta.textContent = study.meta;
  modalTitle.textContent = study.title;
  modalSummary.textContent = study.summary;
  modalQuestion.textContent = study.question;
  modalApproach.textContent = study.approach;

  modalFindings.innerHTML = "";
  study.findings.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalFindings.appendChild(li);
  });

  modal.removeAttribute("hidden");
  document.body.style.overflow = "hidden";
  if (modalClose) modalClose.focus();
}

function closeCaseStudy() {
  if (!modal) return;
  modal.setAttribute("hidden", "");
  document.body.style.overflow = "";
}

document.querySelectorAll(".project-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.getAttribute("data-project");
    if (key) openCaseStudy(key);
  });
});

if (modalClose) {
  modalClose.addEventListener("click", closeCaseStudy);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeCaseStudy();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hasAttribute("hidden")) {
    closeCaseStudy();
  }
});

// One-click Copy Email
const copyBtn = document.getElementById("copy-email-btn");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.getAttribute("data-email") || "";
    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = "Copied";
      copyBtn.classList.add("copied");
      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.classList.remove("copied");
      }, 2000);
    } catch {
      copyBtn.textContent = "Select email";
    }
  });
}

// Floating Back-to-Top Button
const scrollTopBtn = document.getElementById("scroll-top-btn");
if (scrollTopBtn) {
  const toggleScrollTopBtn = () => {
    const shouldShow = window.scrollY > 280;
    scrollTopBtn.classList.toggle("is-visible", shouldShow);
  };

  window.addEventListener("scroll", toggleScrollTopBtn, { passive: true });
  toggleScrollTopBtn();

  scrollTopBtn.addEventListener("click", () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
}

// Blended Background: Elastic Drafting Grid + Highlight & Stretch on Cursor + Ambient Trendlines
const bgCanvas = document.getElementById("bg-canvas");
if (bgCanvas instanceof HTMLCanvasElement) {
  const ctx = bgCanvas.getContext("2d");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (ctx) {
    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let startTime = performance.now();

    const pointer = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      velX: 0,
      velY: 0,
      strength: 0,
      targetStrength: 0,
    };

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      bgCanvas.width = Math.floor(width * dpr);
      bgCanvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const trendSeries = [
      {
        baseY: 0.28,
        amp1: 22,
        amp2: 11,
        freq1: 0.0032,
        freq2: 0.0074,
        speed: 0.00038,
        phase: 0.4,
        lineWidth: 1.35,
        step: 160,
      },
      {
        baseY: 0.56,
        amp1: 18,
        amp2: 9,
        freq1: 0.0026,
        freq2: 0.0061,
        speed: -0.00028,
        phase: 2.1,
        lineWidth: 1.1,
        step: 200,
      },
      {
        baseY: 0.8,
        amp1: 15,
        amp2: 8,
        freq1: 0.0039,
        freq2: 0.0083,
        speed: 0.00022,
        phase: 4.3,
        lineWidth: 1,
        step: 220,
      },
    ];

    const getThemePalette = () => ({
      gridLine: "rgba(63, 69, 84, 0.3)",
      gridTicks: "rgba(96, 165, 250, 0.2)",
      highlightRgb: "96, 165, 250",
      highlightMaxAlpha: 0.48,
      nodeFill: "#0f1115",
      series: [
        { stroke: "rgba(96, 165, 250, 0.16)", dot: "rgba(96, 165, 250, 0.3)" },
        { stroke: "rgba(180, 182, 190, 0.11)", dot: "rgba(180, 182, 190, 0.22)" },
        { stroke: "rgba(139, 142, 152, 0.09)", dot: "rgba(139, 142, 152, 0.18)" },
      ],
    });

    const warpPoint = (x, y) => {
      if (pointer.strength < 0.005) {
        return { x, y, inf: 0 };
      }
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distSq = dx * dx + dy * dy;
      if (distSq > 36100) {
        // Beyond 190px radius, falloff is negligible
        return { x, y, inf: 0 };
      }
      const sigmaSq = 64 * 64 * 2;
      const inf = Math.exp(-distSq / sigmaSq) * pointer.strength;
      const stretch = inf * 0.22;
      return {
        x: x + dx * stretch + pointer.velX * inf * 0.5,
        y: y + dy * stretch + pointer.velY * inf * 0.5,
        inf,
      };
    };

    const drawGrid = (elapsed, scrollOffset, palette) => {
      const cell = 36;
      const majorEvery = 4;
      const majorCell = cell * majorEvery;
      const offsetY = -(scrollOffset * 0.08) % majorCell;
      const driftX = (elapsed * 0.005) % majorCell;
      const startX = driftX < 0 ? driftX : driftX - majorCell;
      const startY = offsetY < 0 ? offsetY : offsetY - majorCell;
      const influenceRange = 190;
      const step = 16;

      ctx.lineWidth = 1;

      // Vertical grid lines
      for (let x = startX; x <= width; x += cell) {
        if (x < 0) continue;
        const nearPointer =
          pointer.strength > 0.005 && Math.abs(x - pointer.x) <= influenceRange;

        if (!nearPointer) {
          const px = Math.round(x) + 0.5;
          ctx.strokeStyle = palette.gridLine;
          ctx.beginPath();
          ctx.moveTo(px, 0);
          ctx.lineTo(px, height);
          ctx.stroke();
          continue;
        }

        const segStart = Math.max(0, Math.floor((pointer.y - influenceRange) / step) * step);
        const segEnd = Math.min(height, Math.ceil((pointer.y + influenceRange) / step) * step);

        // Straight portions outside vertical influence
        ctx.strokeStyle = palette.gridLine;
        ctx.beginPath();
        if (segStart > 0) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, segStart);
        }
        if (segEnd < height) {
          ctx.moveTo(x, segEnd);
          ctx.lineTo(x, height);
        }
        ctx.stroke();

        // Warped & highlighted segments near cursor
        let prev = warpPoint(x, segStart);
        for (let y = segStart + step; y <= segEnd; y += step) {
          const curr = warpPoint(x, y);
          const avgInf = (prev.inf + curr.inf) * 0.5;
          ctx.strokeStyle = palette.gridLine;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.stroke();

          if (avgInf > 0.025) {
            ctx.strokeStyle = `rgba(${palette.highlightRgb}, ${(avgInf * palette.highlightMaxAlpha).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);
            ctx.stroke();
          }
          prev = curr;
        }
      }

      // Horizontal grid lines
      for (let y = startY; y <= height; y += cell) {
        if (y < 0) continue;
        const nearPointer =
          pointer.strength > 0.005 && Math.abs(y - pointer.y) <= influenceRange;

        if (!nearPointer) {
          const py = Math.round(y) + 0.5;
          ctx.strokeStyle = palette.gridLine;
          ctx.beginPath();
          ctx.moveTo(0, py);
          ctx.lineTo(width, py);
          ctx.stroke();
          continue;
        }

        const segStart = Math.max(0, Math.floor((pointer.x - influenceRange) / step) * step);
        const segEnd = Math.min(width, Math.ceil((pointer.x + influenceRange) / step) * step);

        ctx.strokeStyle = palette.gridLine;
        ctx.beginPath();
        if (segStart > 0) {
          ctx.moveTo(0, y);
          ctx.lineTo(segStart, y);
        }
        if (segEnd < width) {
          ctx.moveTo(segEnd, y);
          ctx.lineTo(width, y);
        }
        ctx.stroke();

        let prev = warpPoint(segStart, y);
        for (let x = segStart + step; x <= segEnd; x += step) {
          const curr = warpPoint(x, y);
          const avgInf = (prev.inf + curr.inf) * 0.5;
          ctx.strokeStyle = palette.gridLine;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.stroke();

          if (avgInf > 0.025) {
            ctx.strokeStyle = `rgba(${palette.highlightRgb}, ${(avgInf * palette.highlightMaxAlpha).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);
            ctx.stroke();
          }
          prev = curr;
        }
      }

      // '+' ticks at major 144px grid intersections (stretched & highlighted near cursor)
      for (let x = startX; x <= width; x += majorCell) {
        if (x < 0) continue;
        for (let y = startY; y <= height; y += majorCell) {
          if (y < 0) continue;
          const pt = warpPoint(x, y);
          const size = 3 + pt.inf * 1.8;
          ctx.strokeStyle =
            pt.inf > 0.04
              ? `rgba(${palette.highlightRgb}, ${(0.22 + pt.inf * 0.45).toFixed(3)})`
              : palette.gridTicks;
          ctx.beginPath();
          ctx.moveTo(pt.x - size, pt.y);
          ctx.lineTo(pt.x + size, pt.y);
          ctx.moveTo(pt.x, pt.y - size);
          ctx.lineTo(pt.x, pt.y + size);
          ctx.stroke();
        }
      }
    };

    const evalSeriesY = (series, x, t, scrollOffset) => {
      const center = height * series.baseY - scrollOffset * 0.04;
      const wave1 = Math.sin(x * series.freq1 + t * series.speed + series.phase) * series.amp1;
      const wave2 = Math.cos(x * series.freq2 - t * series.speed * 1.4 + series.phase) * series.amp2;
      return center + wave1 + wave2;
    };

    const drawTrendlines = (elapsed, scrollOffset, palette) => {
      trendSeries.forEach((series, index) => {
        const seriesPalette = palette.series[index] || palette.series[0];
        const sampleStep = 10;
        let prev = warpPoint(0, evalSeriesY(series, 0, elapsed, scrollOffset));

        for (let x = sampleStep; x <= width; x += sampleStep) {
          const curr = warpPoint(x, evalSeriesY(series, x, elapsed, scrollOffset));
          const avgInf = (prev.inf + curr.inf) * 0.5;

          ctx.strokeStyle = seriesPalette.stroke;
          ctx.lineWidth = series.lineWidth;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.stroke();

          if (avgInf > 0.03) {
            ctx.strokeStyle = `rgba(${palette.highlightRgb}, ${(avgInf * 0.42).toFixed(3)})`;
            ctx.lineWidth = series.lineWidth + avgInf * 0.7;
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);
            ctx.stroke();
          }

          prev = curr;
        }

        // Drifting data nodes along the curve (stretching & lighting up near cursor)
        const nodeDrift = (elapsed * 0.015 * Math.sign(series.speed)) % series.step;
        const firstNodeX = nodeDrift < 0 ? nodeDrift + series.step : nodeDrift;
        for (let x = firstNodeX; x <= width; x += series.step) {
          const baseY = evalSeriesY(series, x, elapsed, scrollOffset);
          const pt = warpPoint(x, baseY);
          const radius = 2.75 + pt.inf * 1.4;
          ctx.fillStyle = palette.nodeFill;
          ctx.strokeStyle =
            pt.inf > 0.04
              ? `rgba(${palette.highlightRgb}, ${(0.35 + pt.inf * 0.55).toFixed(3)})`
              : seriesPalette.dot;
          ctx.lineWidth = 1.25 + pt.inf * 0.4;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      });
    };

    const renderFrame = (now) => {
      const elapsed = motionQuery.matches ? 0 : now - startTime;
      const scrollOffset = window.scrollY || 0;
      const palette = getThemePalette();

      const prevX = pointer.x;
      const prevY = pointer.y;

      if (pointer.targetX > -500) {
        if (pointer.x < -500) {
          pointer.x = pointer.targetX;
          pointer.y = pointer.targetY;
        } else {
          pointer.x += (pointer.targetX - pointer.x) * 0.22;
          pointer.y += (pointer.targetY - pointer.y) * 0.22;
        }
      }

      const vx = Math.max(-24, Math.min(24, pointer.x - prevX));
      const vy = Math.max(-24, Math.min(24, pointer.y - prevY));
      pointer.velX += (vx - pointer.velX) * 0.25;
      pointer.velY += (vy - pointer.velY) * 0.25;
      pointer.strength += (pointer.targetStrength - pointer.strength) * 0.1;

      ctx.clearRect(0, 0, width, height);
      drawGrid(elapsed, scrollOffset, palette);
      drawTrendlines(elapsed, scrollOffset, palette);

      if (!motionQuery.matches && !document.hidden) {
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    const startLoop = () => {
      window.cancelAnimationFrame(rafId);
      if (motionQuery.matches) {
        renderFrame(startTime);
      } else {
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    window.addEventListener("resize", () => {
      resizeCanvas();
      if (motionQuery.matches) renderFrame(startTime);
    });

    window.addEventListener(
      "pointermove",
      (event) => {
        pointer.targetX = event.clientX;
        pointer.targetY = event.clientY;
        const targetEl = event.target instanceof Element ? event.target : null;
        const onContentSurface = Boolean(
          targetEl &&
            targetEl.closest(
              ".hero-ledger, .project-card, .skill-group, .modal-dialog, .site-header, .scroll-top-btn"
            )
        );
        pointer.targetStrength = onContentSurface ? 0.35 : 1;
      },
      { passive: true }
    );

    window.addEventListener("pointerleave", () => {
      pointer.targetStrength = 0;
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        window.cancelAnimationFrame(rafId);
      } else {
        startLoop();
      }
    });

    motionQuery.addEventListener("change", startLoop);

    resizeCanvas();
    startLoop();
  }
}
