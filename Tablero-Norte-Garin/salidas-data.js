/* =========================
   SALIDAS - CALENDARIO ÚNICO (COMPARTIDO)
   Visible desde: Sábado 28/02/2026
   ========================= */
(function () {
  const wd = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const TERRITORY_PREFIX =
    "https://sites.google.com/view/territoriosgarin/territorio-";
  const territoryUrl = (n) => `${TERRITORY_PREFIX}${encodeURIComponent(n)}`;

  const parseTerr = (v) => {
    if (!v) return [];
    const s = String(v).trim();
    if (s === "–" || s === "—" || s === "") return [];
    return s
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  };

  const label = (y, m, d) => ({ w: wd[new Date(y, m - 1, d).getDay()], d });

  const startOfDay = (d) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  function parseISOToLocalDate(iso) {
    const [y, m, d] = String(iso).split("-").map(Number);
    return new Date(y, (m || 1) - 1, d || 1);
  }

  // Google Maps helper
  const mapsSearch = (query) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query
    )}`;

  // ====== DATOS ======

  // Febrero 2026 (VISIBLE SOLO DESDE EL 28)
  const FEB_2026 = {
    y: 2026,
    m: 2,
    d: {
      28: [
        {
          h: "09:30",
          l: "Golf Club Argentino y Golf Club Santa Lucía",
          c: "Elvio Casco",
          t: "47",
        },
        {
          h: "19:00",
          l: "Pred. pública Estación Garín",
          c: "Adolfo Gutiérrez",
        },
      ],
    },
  };

  // Marzo 2026 completo
  const MAR_2026 = {
    y: 2026,
    m: 3,
    d: {
      1: [{ type: "feriado", l: "ASAMBLEA DE CIRCUITO" }],

      2: [{ h: "09:00", l: "Hna. Carmen Casas", c: "—", t: "11" }],

      3: [
        { h: "09:00", l: "Colón y Alte Brown", c: "—", t: "23" },
        { h: "18:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "45" },
      ],

      4: [{ h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "27" }],

      5: [{ h: "09:00", l: "Magallanes y Fructuoso Díaz", c: "—", t: "31" }],

      6: [{ h: "09:00", l: "San Martín y Colón", c: "Francisco Araoz", t: "8" }],

      7: [
        { h: "09:30", l: "Predicación de Grupo" },
        {
          h: "–",
          l: "Mañana – Grupo 1 – Familia Segovia",
          c: "Daniel Albis",
          t: "18",
        },
        {
          h: "–",
          l: "Mañana – Grupo 2 – Hna. Fany Villantoy",
          c: "Horacio Salgado",
          t: "25",
        },
        {
          h: "–",
          l: "Mañana – Grupo 3 – Familia Miño",
          c: "Elvio Casco",
          t: "17",
        },
        {
          h: "–",
          l: "Mañana – Grupo 4 – Familia Durán",
          c: "Lucas Segovia",
          t: "20",
        },
      ],

      8: [{ type: "reunion", l: "Reunión por la mañana" }],

      9: [{ h: "09:00", l: "Hna. Carmen Casas", c: "—", t: "16" }],

      10: [
        { h: "09:00", l: "Paso y Centenario", c: "—", t: "12" },
        { h: "18:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "41, 42" },
      ],

      11: [{ h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "15" }],

      12: [{ h: "09:00", l: "Beliera y Fructuoso Díaz", c: "—", t: "32" }],

      13: [{ h: "09:00", l: "Cigliutti y Ressio", c: "Francisco Araoz", t: "3" }],

      14: [
        { type: "feriado", l: "DÍA PREDICACIÓN EXTENDIDA (Mañana 9:00 hs)" },
        { h: "09:00", l: "Salón del Reino", c: "Horacio Salgado", t: "" },

        { h: "–", l: "Grupo 1", c: "León Segovia", t: "57" },
        { h: "–", l: "Grupo 2", c: "Mario Segovia", t: "55" },
        { h: "–", l: "Grupo 3", c: "Darío Cortez", t: "48" },
        { h: "–", l: "Grupo 4", c: "Adolfo Gutierrez", t: "56" },

        { h: "16:30", l: "Concordia y Ambrosetti", c: "Horacio Salgado", t: "54" },
        { h: "18:00", l: "Concordia y Ravignani", c: "Lucas Segovia", t: "53" },
      ],

      15: [{ type: "reunion", l: "Reunión por la mañana" }],

      16: [{ h: "09:00", l: "Hna. Carmen Casas", c: "Diego Sarraute", t: "6" }],

      17: [
        { h: "09:00", l: "Storni y Fructuoso Díaz", c: "—", t: "4" },
        { h: "18:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "40" },
      ],

      18: [{ h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "9" }],

      19: [{ h: "09:00", l: "Falco y 1º de Mayo", c: "—", t: "33" }],

      20: [{ h: "09:00", l: "Uruguay y Centenario", c: "Francisco Araoz", t: "21" }],

      21: [
        { h: "09:30", l: "Predicación de Grupo" },
        { h: "–", l: "Grupo 1 – Colón y Vicente Lopez", c: "Daniel Quaranta", t: "24" },
        { h: "–", l: "Grupo 2 – Paso y San Martín", c: "Manuel Feril", t: "7" },
        { h: "–", l: "Grupo 3 – Francia y Centenario", c: "Pablo Zuñiga", t: "14" },
        { h: "–", l: "Grupo 4 – Francia y Alte Brown", c: "Caetano Ferrari", t: "22" },
      ],

      22: [{ type: "reunion", l: "Reunión por la mañana" }],

      23: [{ h: "09:00", l: "Hna. Carmen Casas", c: "—", t: "10" }],

      24: [
        { type: "feriado", l: "Feriado (horario 10:00 hs.)" },
        { h: "10:00", l: "Fructuoso Díaz y Beliera", c: "—", t: "26" },
      ],

      25: [{ h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "27" }],

      26: [{ h: "09:00", l: "Maipú y Fructuoso Díaz", c: "—", t: "35" }],

      27: [{ h: "09:00", l: "Colón y Beliera", c: "Francisco Araoz", t: "29" }],

      28: [
        { h: "09:30", l: "Predicación de Grupo" },
        { h: "–", l: "Grupo 1 – Plaza Barrio Salas", c: "—", t: "52" },
        { h: "–", l: "Grupo 2 – Plaza Barrio Salas", c: "Horacio Salgado", t: "52" },
        { h: "–", l: "Grupo 3 – Plaza Barrio Salas", c: "—", t: "52" },
        { h: "–", l: "Grupo 4 – Plaza Barrio Salas", c: "—", t: "52" },
      ],

      29: [{ type: "reunion", l: "Reunión por la mañana" }],

      30: [{ h: "09:00", l: "Hna. Carmen Casas", c: "Diego Sarraute", t: "11" }],

      31: [
        { h: "09:00", l: "Colón y Centenario", c: "Diego Sarraute", t: "13" },
        { h: "18:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "40" },
      ],
    },
  };

  const CALENDARIO = [FEB_2026, MAR_2026];

  // ===== Helpers para consultar por fecha =====
  function getEntriesForDate(date) {
    const d = startOfDay(date);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();

    const monthObj = CALENDARIO.find((x) => x.y === y && x.m === m);
    if (!monthObj) return [];
    const arr = monthObj.d?.[day];
    return Array.isArray(arr) ? arr : [];
  }

  function formatEntryForDashboard(e) {
    if (e.type) return e.l;

    const h = String(e.h || "").trim();
    const hasHora = h && h !== "–" && !h.includes("–");
    const hora = hasHora ? `${h} — ` : "";

    const conduce = e.c ? ` (Conduce: ${e.c})` : "";
    const terr = e.t ? ` · T-${e.t}` : "";

    return `${hora}${e.l || ""}${conduce}${terr}`.trim();
  }

  function getTodayText() {
    const entries = getEntriesForDate(new Date());
    if (!entries.length) return null;
    const lines = entries.map(formatEntryForDashboard).filter(Boolean);
    return lines.length ? lines.join(" | ") : null;
  }

  function getDayText(isoDate) {
    const d = parseISOToLocalDate(isoDate);
    const entries = getEntriesForDate(d);
    if (!entries.length) return null;
    const lines = entries.map(formatEntryForDashboard).filter(Boolean);
    return lines.length ? lines.join(" | ") : null;
  }

  // ===== Exponer en window para usar en index y salidas =====
  window.SALIDAS_CAL = {
    wd,
    label,
    parseTerr,
    territoryUrl,
    CALENDARIO,
    FEB_2026,
    MAR_2026,
    getEntriesForDate,
    getTodayText,
    getDayText,
  };
})();