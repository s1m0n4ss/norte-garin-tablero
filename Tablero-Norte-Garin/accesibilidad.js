/* Norte Garín · Tamaño de letra (A− / A / A+) y botón "Volver arriba".
   Solo cambia cómo se ve. Guarda la preferencia en este celular (localStorage). */
(function () {
  "use strict";
  var root = document.documentElement;
  var KEY = "ng-tamano-letra";
  var SIZES = [0.94, 1, 1.15, 1.3, 1.5]; // A− nunca deja un texto por debajo de 16px

  function read() { try { return parseFloat(localStorage.getItem(KEY)); } catch (e) { return NaN; } }
  function save(v) { try { localStorage.setItem(KEY, String(v)); } catch (e) {} }

  var current = read();
  if (SIZES.indexOf(current) < 0) current = 1;

  function apply(v) {
    current = v;
    root.style.setProperty("--scale", String(v));
    var down = document.getElementById("ngSizeDown"), up = document.getElementById("ngSizeUp"), reset = document.getElementById("ngSizeReset");
    if (down) down.disabled = v <= SIZES[0];
    if (up) up.disabled = v >= SIZES[SIZES.length - 1];
    if (reset) reset.setAttribute("aria-pressed", String(v === 1));
  }
  function step(d) {
    var i = SIZES.indexOf(current);
    var n = SIZES[Math.max(0, Math.min(SIZES.length - 1, i + d))];
    apply(n); save(n);
  }

  function init() {
    var down = document.getElementById("ngSizeDown"), up = document.getElementById("ngSizeUp"), reset = document.getElementById("ngSizeReset");
    if (down) down.addEventListener("click", function () { step(-1); });
    if (up) up.addEventListener("click", function () { step(1); });
    if (reset) reset.addEventListener("click", function () { apply(1); save(1); });
    apply(current);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ng-totop";
    btn.hidden = true;
    btn.innerHTML = '<span aria-hidden="true">↑</span> Volver arriba';
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0 });
      var first = document.querySelector(".ng-tabs a[aria-current]") || document.getElementById("btnMenu");
      if (first) first.focus({ preventScroll: true });
    });
    document.body.appendChild(btn);
    var onScroll = function () { btn.hidden = window.scrollY < 500; };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  apply(current);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
