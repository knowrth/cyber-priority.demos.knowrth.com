/**
 * demo-overlay.js
 * - disables right-click (context menu)
 * - displays 5–10 persistent floating "demo by knowrth.com" texts
 *   evenly distributed across the screen
 */

(function () {
  if (window._knowrthDemoInstalled) return;
  window._knowrthDemoInstalled = true;

  // --- Disable right-click ---
  function preventContext(e) {
    e.preventDefault();
  }
  document.addEventListener("contextmenu", preventContext, { passive: false });

  // --- Create overlay container ---
  const overlay = document.createElement("div");
  overlay.id = "knowrth-demo-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    zIndex: 999999,
    pointerEvents: "none",
    overflow: "hidden",
    background: "rgba(0, 0, 0, 0.03)",
  });
  document.body.appendChild(overlay);

  // --- Add CSS for floating animation ---
  const style = document.createElement("style");
  style.textContent = `
    @keyframes knowrth-float {
      0% { transform: translateY(0px) rotate(-2deg); opacity: 0.9; }
      50% { transform: translateY(-8px) rotate(2deg); opacity: 1; }
      100% { transform: translateY(0px) rotate(-2deg); opacity: 0.9; }
    }
    .knowrth-demo-text {
      position: absolute;
      color: rgba(255,255,255,0.95);
      background: rgba(0,0,0,0.55);
      padding: 6px 10px;
      border-radius: 6px;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      font-weight: 600;
      font-size: 16px;
      letter-spacing: 0.04em;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      user-select: none;
      white-space: nowrap;
      animation: knowrth-float 5s ease-in-out infinite;
      backdrop-filter: blur(3px);
    }
  `;
  document.head.appendChild(style);

  // --- Utility ---
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  // --- Calculate evenly spaced positions ---
  const count = Math.floor(rand(2, 3)); // 5–10 texts
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  // Determine grid size based on count (approx square)
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);

  const cellWidth = vw / cols;
  const cellHeight = vh / rows;

  let placed = 0;
  for (let r = 0; r < rows && placed < count; r++) {
    for (let c = 0; c < cols && placed < count; c++) {
      const text = document.createElement("div");
      text.className = "knowrth-demo-text";
      text.textContent = "demo by knowrth.com";

      // Base position in grid cell
      const baseLeft = c * cellWidth + cellWidth / 2;
      const baseTop = r * cellHeight + cellHeight / 2;

      // Add small random offsets for organic feel
      const left = baseLeft + rand(-cellWidth * 0.2, cellWidth * 0.2);
      const top = baseTop + rand(-cellHeight * 0.2, cellHeight * 0.2);
      text.style.left = `${left}px`;
      text.style.top = `${top}px`;
      text.style.transform = `translate(-50%, -50%) rotate(${rand(-6, 6).toFixed(1)}deg) scale(${rand(0.9, 1.3).toFixed(2)})`;

      // Vary animation speed and delay slightly
      text.style.animationDelay = `${rand(0, 3).toFixed(2)}s`;
      text.style.animationDuration = `${rand(4, 7).toFixed(2)}s`;

      overlay.appendChild(text);
      placed++;
    }
  }

  // --- Cleanup function ---
  window._knowrthDemoStop = function () {
    document.removeEventListener("contextmenu", preventContext, { passive: false });
    overlay.remove();
    style.remove();
    window._knowrthDemoInstalled = false;
  };
})();
