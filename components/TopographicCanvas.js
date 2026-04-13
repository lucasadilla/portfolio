import { useEffect, useRef } from 'react';

/**
 * Animated B&W topographic contours from a drifting height field + pointer “bump”.
 */
export default function TopographicCanvas() {
    const canvasRef = useRef(null);
    const rafRef = useRef(0);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
        const saveBattery =
            typeof navigator !== 'undefined' &&
            navigator.deviceMemory != null &&
            navigator.deviceMemory <= 4;

        let w = 0;
        let h = 0;
        let dpr = 1;
        let cell = 10;
        let cols = 0;
        let rows = 0;
        let t = 0;
        let mx = 0;
        let my = 0;
        let targetMx = 0;
        let targetMy = 0;

        /* Fewer levels = far fewer strokes per frame */
        const LEVELS = [-1.45, -0.75, -0.05, 0.65, 1.35];

        const ptsPool = [];
        const segBatch = [];

        function resize() {
            /* Cap DPR: retina 2× costs 4× pixels; 1.25× is usually enough for thin lines */
            dpr = Math.min(window.devicePixelRatio || 1, coarsePointer || saveBattery ? 1 : 1.25);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            /* Coarser grid = fewer marching-square cells (biggest CPU win) */
            const base = Math.floor(Math.min(w, h) / (coarsePointer || saveBattery ? 28 : 34));
            cell = Math.max(17, Math.min(26, base));
            cols = Math.ceil(w / cell) + 1;
            rows = Math.ceil(h / cell) + 1;
            targetMx = mx = w * 0.5;
            targetMy = my = h * 0.45;
        }

        function heightAt(x, y, time) {
            /* Subtle pointer bump: small amplitude, tight falloff, slow-smoothed mx/my in tick() */
            const dx = (x - mx) * 0.0038;
            const dy = (y - my) * 0.0038;
            const r2 = dx * dx + dy * dy;
            const bump = Math.exp(-r2 * 14) * 0.38;

            return (
                Math.sin(x * 0.0055 + time * 0.38) * Math.cos(y * 0.0048 - time * 0.31) * 1.05 +
                0.52 * Math.sin((x + y) * 0.0036 + time * 0.52) +
                0.38 * Math.sin(x * 0.011 + Math.sin(y * 0.007 + time * 0.2) * 1.4 + time * 0.22) +
                0.22 * Math.sin(x * 0.002 + y * 0.0033 + time * 0.15) +
                bump
            );
        }

        function cornerHeights(time, cache) {
            const n = cols * rows;
            if (cache.length !== n) cache.length = 0;
            let i = 0;
            for (let j = 0; j < rows; j++) {
                for (let c = 0; c < cols; c++) {
                    cache[i++] = heightAt(c * cell, j * cell, time);
                }
            }
        }

        function hAt(c, j, cache) {
            return cache[j * cols + c];
        }

        /**
         * Pushes segment pairs into `out` as [x0,y0,x1,y1,...] to avoid per-cell array churn.
         * Saddle case uses corner average instead of another heightAt() (cheaper, visually fine).
         */
        function pushCellSegments(c, j, L, cache, out) {
            const x0 = c * cell;
            const y0 = j * cell;
            const x1 = x0 + cell;
            const y1 = y0 + cell;
            const v0 = hAt(c, j, cache);
            const v1 = hAt(c + 1, j, cache);
            const v2 = hAt(c + 1, j + 1, cache);
            const v3 = hAt(c, j + 1, cache);

            ptsPool.length = 0;
            const pts = ptsPool;
            function cross(va, vb, ax, ay, bx, by) {
                if (Math.abs(vb - va) < 1e-8) return;
                if ((va >= L && vb >= L) || (va < L && vb < L)) return;
                const u = (L - va) / (vb - va);
                pts.push(ax + u * (bx - ax), ay + u * (by - ay));
            }

            cross(v0, v1, x0, y0, x1, y0);
            cross(v1, v2, x1, y0, x1, y1);
            cross(v2, v3, x1, y1, x0, y1);
            cross(v3, v0, x0, y1, x0, y0);

            /* Flat pts: 4 floats = one segment, 8 floats = saddle (two segments) */
            if (pts.length === 8) {
                const vc = (v0 + v1 + v2 + v3) * 0.25;
                if (vc >= L) {
                    out.push(pts[0], pts[1], pts[4], pts[5], pts[2], pts[3], pts[6], pts[7]);
                } else {
                    out.push(pts[0], pts[1], pts[6], pts[7], pts[2], pts[3], pts[4], pts[5]);
                }
                return;
            }
            if (pts.length === 4) {
                out.push(pts[0], pts[1], pts[2], pts[3]);
            }
        }

        const cornerCache = [];

        function drawFrame(time) {
            cornerHeights(time, cornerCache);

            ctx.fillStyle = '#030303';
            ctx.fillRect(0, 0, w, h);

            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            for (let li = 0; li < LEVELS.length; li++) {
                const L = LEVELS[li];
                const alpha = 0.1 + (li / LEVELS.length) * 0.22;
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.lineWidth = li % 2 === 0 ? 1 : 0.7;
                segBatch.length = 0;
                for (let j = 0; j < rows - 1; j++) {
                    for (let c = 0; c < cols - 1; c++) {
                        pushCellSegments(c, j, L, cornerCache, segBatch);
                    }
                }
                ctx.beginPath();
                for (let s = 0; s < segBatch.length; s += 4) {
                    ctx.moveTo(segBatch[s], segBatch[s + 1]);
                    ctx.lineTo(segBatch[s + 2], segBatch[s + 3]);
                }
                ctx.stroke();
            }
        }

        function onPointerMove(e) {
            targetMx = e.clientX;
            targetMy = e.clientY;
        }

        function onTouchMove(e) {
            if (!e.touches?.length) return;
            targetMx = e.touches[0].clientX;
            targetMy = e.touches[0].clientY;
        }

        function tick() {
            rafRef.current = requestAnimationFrame(tick);
            if (document.hidden) return;

            if (!reduceMotion) {
                mx += (targetMx - mx) * 0.028;
                my += (targetMy - my) * 0.028;
                t += 0.016;
            }

            drawFrame(reduceMotion ? 0 : t);
        }

        resize();
        window.addEventListener('resize', resize);
        function onTouchStart(e) {
            if (!e.touches?.length) return;
            targetMx = e.touches[0].clientX;
            targetMy = e.touches[0].clientY;
        }

        window.addEventListener('mousemove', onPointerMove, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('touchstart', onTouchStart, { passive: true });

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onPointerMove);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchstart', onTouchStart);
        };
    }, []);

    return <canvas ref={canvasRef} className="topo-canvas" aria-hidden />;
}
