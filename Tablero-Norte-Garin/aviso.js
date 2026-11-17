/* Norte Garín · Aviso temporal arriba de cada página.
   Para un aviso nuevo, cambiar AVISO (id nuevo, texto y fechas). Fuera de las fechas no se muestra nada.
   Si alguien lo cierra, queda cerrado en ese celular (localStorage). */
(function () {
  "use strict";
  var AVISO = {
    id: "cambio-horario-salidas-2026-11-b",
    titulo: "Cambio de horario de las salidas",
    texto: "Desde el miércoles 18 de noviembre, las salidas de la mañana son a las 9:00 hs de lunes a viernes y a las 9:30 hs los sábados. La salida de la tarde de los miércoles pasa a las 18:00 hs, igual que los martes y viernes.",
    desde: new Date(2026, 10, 16),      // 16 de noviembre de 2026
    hasta: new Date(2026, 10, 25)       // se deja de mostrar el 25 de noviembre
  };

  var KEY = "ng-aviso-cerrado-" + AVISO.id;
  var ahora = new Date();
  if (ahora < AVISO.desde || ahora >= AVISO.hasta) return;
  try { if (localStorage.getItem(KEY) === "1") return; } catch (e) {}

  var header = document.querySelector("header");
  if (!header) return;

  var box = document.createElement("div");
  box.className = "ng-aviso";
  box.setAttribute("role", "status");
  box.innerHTML =
    '<div class="ng-aviso-texto"><strong></strong><span></span></div>' +
    '<button type="button" class="ng-aviso-cerrar" aria-label="Cerrar aviso">&times;</button>';
  box.querySelector("strong").textContent = AVISO.titulo;
  box.querySelector("span").textContent = AVISO.texto;
  box.querySelector("button").addEventListener("click", function () {
    box.remove();
    try { localStorage.setItem(KEY, "1"); } catch (e) {}
  });
  header.insertAdjacentElement("afterend", box);
})();
