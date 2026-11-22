import { useEffect, useRef } from 'react';

interface TrendSeriesConfig {
  baseY: number;
  amp1: number;
  amp2: number;
  freq1: number;
  freq2: number;
  speed: number;
  phase: number;
  lineWidth: number;
  step: number;
}

const TREND_SERIES: TrendSeriesConfig[] = [
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

const PALETTE = {
  gridLine: 'rgba(63, 69, 84, 0.3)',
  gridTicks: 'rgba(96, 165, 250, 0.2)',
  highlightRgb: '96, 165, 250',
  highlightMaxAlpha: 0.48,
  nodeFill: '#0f1115',
  series: [
    { stroke: 'rgba(96, 165, 250, 0.16)', dot: 'rgba(96, 165, 250, 0.3)' },
    { stroke: 'rgba(180, 182, 190, 0.11)', dot: 'rgba(180, 182, 190, 0.22)' },
    { stroke: 'rgba(139, 142, 152, 0.09)', dot: 'rgba(139, 142, 152, 0.18)' },
  ],
};

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    const startTime = performance.now();

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
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const warpPoint = (x: number, y: number) => {
      if (pointer.strength < 0.005) {
        return { x, y, inf: 0 };
      }
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distSq = dx * dx + dy * dy;
      if (distSq > 36100) {
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

    const drawGrid = (elapsed: number, scrollOffset: number) => {
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

      for (let x = startX; x <= width; x += cell) {
        if (x < 0) continue;
        const nearPointer =
          pointer.strength > 0.005 && Math.abs(x - pointer.x) <= influenceRange;

        if (!nearPointer) {
          const px = Math.round(x) + 0.5;
          ctx.strokeStyle = PALETTE.gridLine;
          ctx.beginPath();
          ctx.moveTo(px, 0);
          ctx.lineTo(px, height);
          ctx.stroke();
          continue;
        }

        const segStart = Math.max(
          0,
          Math.floor((pointer.y - influenceRange) / step) * step,
        );
        const segEnd = Math.min(
          height,
          Math.ceil((pointer.y + influenceRange) / step) * step,
        );

        ctx.strokeStyle = PALETTE.gridLine;
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

        let prev = warpPoint(x, segStart);
        for (let y = segStart + step; y <= segEnd; y += step) {
          const curr = warpPoint(x, y);
          const avgInf = (prev.inf + curr.inf) * 0.5;
          ctx.strokeStyle = PALETTE.gridLine;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.stroke();

          if (avgInf > 0.025) {
            ctx.strokeStyle = `rgba(${PALETTE.highlightRgb}, ${(avgInf * PALETTE.highlightMaxAlpha).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);
            ctx.stroke();
          }
          prev = curr;
        }
      }

      for (let y = startY; y <= height; y += cell) {
        if (y < 0) continue;
        const nearPointer =
          pointer.strength > 0.005 && Math.abs(y - pointer.y) <= influenceRange;

        if (!nearPointer) {
          const py = Math.round(y) + 0.5;
          ctx.strokeStyle = PALETTE.gridLine;
          ctx.beginPath();
          ctx.moveTo(0, py);
          ctx.lineTo(width, py);
          ctx.stroke();
          continue;
        }

        const segStart = Math.max(
          0,
          Math.floor((pointer.x - influenceRange) / step) * step,
        );
        const segEnd = Math.min(
          width,
          Math.ceil((pointer.x + influenceRange) / step) * step,
        );

        ctx.strokeStyle = PALETTE.gridLine;
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
          ctx.strokeStyle = PALETTE.gridLine;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.stroke();

          if (avgInf > 0.025) {
            ctx.strokeStyle = `rgba(${PALETTE.highlightRgb}, ${(avgInf * PALETTE.highlightMaxAlpha).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);
            ctx.stroke();
          }
          prev = curr;
        }
      }

      for (let x = startX; x <= width; x += majorCell) {
        if (x < 0) continue;
        for (let y = startY; y <= height; y += majorCell) {
          if (y < 0) continue;
          const pt = warpPoint(x, y);
          const size = 3 + pt.inf * 1.8;
          ctx.strokeStyle =
            pt.inf > 0.04
              ? `rgba(${PALETTE.highlightRgb}, ${(0.22 + pt.inf * 0.45).toFixed(3)})`
              : PALETTE.gridTicks;
          ctx.beginPath();
          ctx.moveTo(pt.x - size, pt.y);
          ctx.lineTo(pt.x + size, pt.y);
          ctx.moveTo(pt.x, pt.y - size);
          ctx.lineTo(pt.x, pt.y + size);
          ctx.stroke();
        }
      }
    };

    const evalSeriesY = (
      series: TrendSeriesConfig,
      x: number,
      t: number,
      scrollOffset: number,
    ) => {
      const center = height * series.baseY - scrollOffset * 0.04;
      const wave1 =
        Math.sin(x * series.freq1 + t * series.speed + series.phase) *
        series.amp1;
      const wave2 =
        Math.cos(x * series.freq2 - t * series.speed * 1.4 + series.phase) *
        series.amp2;
      return center + wave1 + wave2;
    };

    const drawTrendlines = (elapsed: number, scrollOffset: number) => {
      TREND_SERIES.forEach((series, index) => {
        const seriesPalette = PALETTE.series[index] || PALETTE.series[0];
        const sampleStep = 10;
        let prev = warpPoint(0, evalSeriesY(series, 0, elapsed, scrollOffset));

        for (let x = sampleStep; x <= width; x += sampleStep) {
          const curr = warpPoint(
            x,
            evalSeriesY(series, x, elapsed, scrollOffset),
          );
          const avgInf = (prev.inf + curr.inf) * 0.5;

          ctx.strokeStyle = seriesPalette.stroke;
          ctx.lineWidth = series.lineWidth;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.stroke();

          if (avgInf > 0.03) {
            ctx.strokeStyle = `rgba(${PALETTE.highlightRgb}, ${(avgInf * 0.42).toFixed(3)})`;
            ctx.lineWidth = series.lineWidth + avgInf * 0.7;
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);
            ctx.stroke();
          }

          prev = curr;
        }

        const nodeDrift =
          (elapsed * 0.015 * Math.sign(series.speed)) % series.step;
        const firstNodeX = nodeDrift < 0 ? nodeDrift + series.step : nodeDrift;
        for (let x = firstNodeX; x <= width; x += series.step) {
          const baseY = evalSeriesY(series, x, elapsed, scrollOffset);
          const pt = warpPoint(x, baseY);
          const radius = 2.75 + pt.inf * 1.4;
          ctx.fillStyle = PALETTE.nodeFill;
          ctx.strokeStyle =
            pt.inf > 0.04
              ? `rgba(${PALETTE.highlightRgb}, ${(0.35 + pt.inf * 0.55).toFixed(3)})`
              : seriesPalette.dot;
          ctx.lineWidth = 1.25 + pt.inf * 0.4;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      });
    };

    const renderFrame = (now: number) => {
      const elapsed = motionQuery.matches ? 0 : now - startTime;
      const scrollOffset = window.scrollY || 0;

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
      drawGrid(elapsed, scrollOffset);
      drawTrendlines(elapsed, scrollOffset);

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

    const handleResize = () => {
      resizeCanvas();
      if (motionQuery.matches) renderFrame(startTime);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      const targetEl = event.target instanceof Element ? event.target : null;
      const onContentSurface = Boolean(
        targetEl &&
          targetEl.closest(
            '.hero-ledger, .project-card, .cert-card, .skill-group, .modal-dialog, .site-header, .scroll-top-btn',
          ),
      );
      pointer.targetStrength = onContentSurface ? 0.35 : 1;
    };

    const handlePointerLeave = () => {
      pointer.targetStrength = 0;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(rafId);
      } else {
        startLoop();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    motionQuery.addEventListener('change', startLoop);

    resizeCanvas();
    startLoop();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', startLoop);
    };
  }, []);

  return <canvas ref={canvasRef} id="bg-canvas" className="bg-canvas" aria-hidden="true" />;
}
