/* Norte Garín · Panel de configuración (tamaño de letra y modo claro/oscuro) y botón "Volver arriba".
   Solo cambia cómo se ve. Guarda las preferencias en este celular (localStorage). */
(function () {
  "use strict";
  var root = document.documentElement;
  var KEY = "ng-tamano-letra";
  var SIZES = [0.85, 0.94, 1, 1.15, 1.3, 1.5];
  var NOMBRES = ["Muy chica", "Chica", "Normal", "Grande", "Muy grande", "Enorme"];

  function read() { try { return parseFloat(localStorage.getItem(KEY)); } catch (e) { return NaN; } }
  function save(v) { try { localStorage.setItem(KEY, String(v)); } catch (e) {} }

  var current = read();
  if (SIZES.indexOf(current) < 0) current = 1;

  function apply(v) {
    current = v;
    root.style.setProperty("--scale", String(v));
    var down = document.getElementById("ngSizeDown"), up = document.getElementById("ngSizeUp"), reset = document.getElementById("ngSizeReset"), now = document.getElementById("ngSizeNow");
    if (down) down.disabled = v <= SIZES[0];
    if (up) up.disabled = v >= SIZES[SIZES.length - 1];
    if (reset) reset.setAttribute("aria-pressed", String(v === 1));
    if (now) now.textContent = NOMBRES[SIZES.indexOf(v)];
  }
  function step(d) {
    var i = SIZES.indexOf(current);
    var n = SIZES[Math.max(0, Math.min(SIZES.length - 1, i + d))];
    apply(n); save(n);
  }

  function buildSettings() {
    var gear = document.getElementById("ngSettingsBtn");
    if (!gear) return;
    var panel = document.createElement("div");
    panel.id = "ngSettings";
    panel.className = "ng-settings";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-labelledby", "ngSettingsTitle");
    panel.hidden = true;
    panel.innerHTML =
      '<div class="ng-settings-head"><h2 id="ngSettingsTitle">Configuración</h2>' +
      '<button type="button" class="ng-settings-close" id="ngSettingsClose">Cerrar</button></div>' +
      '<div class="ng-settings-sec"><h3>Tamaño de letra</h3>' +
      '<p class="ng-settings-now">Ahora: <strong id="ngSizeNow"></strong></p>' +
      '<div class="ng-settings-size">' +
      '<button type="button" id="ngSizeDown"><span class="a" aria-hidden="true">A−</span> Más chica</button>' +
      '<button type="button" id="ngSizeReset"><span class="a" aria-hidden="true">A</span> Normal</button>' +
      '<button type="button" id="ngSizeUp"><span class="a" aria-hidden="true">A+</span> Más grande</button>' +
      "</div></div>" +
      '<div class="ng-settings-sec" id="ngThemeSlot"><h3>Modo de pantalla</h3></div>';
    document.body.appendChild(panel);

    // El botón de tema que ya existía (con su función original) pasa del menú lateral a este panel
    var theme = document.getElementById("btnTheme");
    if (theme) document.getElementById("ngThemeSlot").appendChild(theme);

    document.getElementById("ngSizeDown").addEventListener("click", function () { step(-1); });
    document.getElementById("ngSizeUp").addEventListener("click", function () { step(1); });
    document.getElementById("ngSizeReset").addEventListener("click", function () { apply(1); save(1); });

    function open() { panel.hidden = false; gear.setAttribute("aria-expanded", "true"); document.getElementById("ngSettingsClose").focus(); }
    function close(focusGear) { panel.hidden = true; gear.setAttribute("aria-expanded", "false"); if (focusGear) gear.focus(); }
    gear.addEventListener("click", function (e) { e.stopPropagation(); if (panel.hidden) open(); else close(false); });
    document.getElementById("ngSettingsClose").addEventListener("click", function () { close(true); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) close(true); });
    document.addEventListener("click", function (e) { if (!panel.hidden && !panel.contains(e.target) && e.target !== gear) close(false); });
  }

  function buildToTop() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ng-totop";
    btn.hidden = true;
    btn.innerHTML = '<span aria-hidden="true">↑</span> Volver arriba';
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0 });
      var first = document.getElementById("btnMenu");
      if (first) first.focus({ preventScroll: true });
    });
    document.body.appendChild(btn);
    var onScroll = function () { btn.hidden = window.scrollY < 500; };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function init() {
    buildSettings();
    apply(current);
    buildToTop();
  }

  apply(current);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
