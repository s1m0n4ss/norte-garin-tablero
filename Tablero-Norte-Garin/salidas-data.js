/* =========================
   SALIDAS - CALENDARIO ÚNICO (COMPARTIDO)
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

  // Febrero 2026 completo (único mes visible)
  const FEB_2026 = {
    y: 2026,
    m: 2,
    d: {
      1: [{ type: "reunion", l: "Reunión 9:30 am" }],

      2: [
        { h: "09:00", l: "Hna. Carmen Casas", c: "Diego Sarraute", t: "11" },
        {
          h: "18:00",
          l: "Rastreador Fournier y Cigliutti",
          c: "Diego Sarraute",
          t: "1",
        },
      ],

      3: [
        { h: "09:00", l: "Andes y 1.º de Mayo", c: "Diego Sarraute", t: "37" },
        { h: "18:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "39" },
      ],

      4: [{ h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "9" }],

      5: [
        {
          h: "09:00",
          l: "Paso y Fructuoso Díaz",
          c: "Diego Sarraute",
          t: "5",
        },
        { type: "reunion", l: "Reunión 19:30 pm" },
      ],

      6: [
        {
          h: "09:00",
          l: "Fructuoso Díaz y Magallanes",
          c: "Francisco Araoz",
          t: "31",
        },
      ],

      7: [
        { h: "09:30", l: "Predicación de Grupo" },

        { h: "–", l: "Grupo 1 – Flia. Segovia", c: "Diego Sarraute", t: "19" },
        { h: "–", l: "Grupo 2 – Hna. Doris", c: "Manuel Feril", t: "23" },
        {
          h: "–",
          l: "Grupo 3 – Andes y 1.º de Mayo",
          c: "Darío Cortez",
          t: "38",
        },
        {
          h: "–",
          l: "Grupo 4 – Familia Durán",
          c: "Caetano Ferrari",
          t: "22",
        },

        {
          h: "18:00",
          l: "Golf Club Argentino y Jockey Club",
          c: "León Segovia",
          t: "51",
        },
        {
          h: "19:00",
          l: "Pred. pública Estación Garín",
          c: "Adolfo Gutiérrez",
        },
      ],

      8: [{ type: "reunion", l: "Reunión 9:30 am" }],

      9: [
        { h: "09:00", l: "Hna. Carmen Casas", c: "Diego Sarraute", t: "16" },
        { h: "18:00", l: "Francia y San Martín", c: "Diego Sarraute", t: "8" },
      ],

      10: [
        { h: "09:00", l: "Francia y San Martín", c: "Diego Sarraute", t: "13" },
        { type: "reunion", l: "Reunión 19:30 pm (Visita del Superintendente)" },
      ],

      // ===== Visita del Superintendente (11 al 14)
      // ✅ Ajuste solicitado: mañanas 10:00 / tardes 17:30 =====

      11: [
        {
          h: "10:00",
          l: "Familia Miño",
          c: "Mauricio Tierno",
          t: "12",
          maps: mapsSearch("Paso 842, Garín, Buenos Aires"),
        },
        {
          h: "17:30",
          l: "Hna. Fany Villantoy",
          c: "Mauricio Tierno",
          t: "17, 25",
          maps: mapsSearch("Ituzaingó 1040, Garín, Buenos Aires"),
        },
      ],

      12: [
        {
          h: "10:00",
          l: "Hna. Cintia Cancino",
          c: "Mauricio Tierno",
          t: "30, 32",
          maps: mapsSearch("Beliera 3512, Garín, Buenos Aires"),
        },
      ],

      13: [
        {
          h: "10:00",
          l: "Familia Segovia",
          c: "Mauricio Tierno",
          t: "18",
          maps: mapsSearch("Almirante Brown 3632, Garín, Buenos Aires"),
        },
        {
          h: "17:30",
          l: "Familia Flores",
          c: "Mauricio Tierno",
          t: "26, 27",
          maps: mapsSearch("Almirante Brown 2775, Garín, Buenos Aires"),
        },
      ],

      14: [
        {
          h: "10:00",
          l: "Salón del Reino",
          c: "Mauricio Tierno",
          t: "3, 4, 6, 10",
        },
        {
          h: "17:30",
          l: "Hno. Manuel Feril",
          c: "Mauricio Tierno",
          t: "20, 21, 28",
          maps: mapsSearch("Uruguay 1193, Garín, Buenos Aires"),
        },
      ],

      15: [{ type: "reunion", l: "Reunión 9:30 am" }],

      // ✅ 16 y 17 SOLO MAÑANA, 10:30
      16: [
        {
          h: "10:30",
          l: "Uruguay y Centenario",
          c: "Diego Sarraute",
          t: "14",
        },
      ],

      17: [
        { h: "10:30", l: "Colón y Beliera", c: "Diego Sarraute", t: "24" },
      ],

      18: [{ h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "15" }],

      19: [
        { h: "09:00", l: "Falco y Magallanes", c: "Diego Sarraute", t: "33" },
        { type: "reunion", l: "Reunión 19:30 pm" },
      ],

      20: [{ h: "09:00", l: "Andes y Ressio", c: "Francisco Araoz", t: "2" }],

      21: [
        {
          h: "09:30",
          l: "Golf Club Argentino y Jockey Club",
          c: "Daniel Albis",
          t: "49",
        },
        {
          h: "18:00",
          l: "Ambrosetti y Concordia",
          c: "León Segovia",
          t: "54",
        },
        {
          h: "19:00",
          l: "Pred. pública Estación Garín",
          c: "Adolfo Gutiérrez",
        },
      ],

      22: [{ type: "reunion", l: "Reunión 9:30 am" }],

      23: [
        {
          h: "09:00",
          l: "Patricias Argentinas y Calle 3",
          c: "Diego Sarraute",
          t: "34",
        },
        {
          h: "18:00",
          l: "Fructuoso Díaz y Maipú",
          c: "Diego Sarraute",
          t: "35",
        },
      ],

      24: [
        { h: "09:00", l: "Colón y Beliera", c: "Diego Sarraute", t: "29" },
        {
          h: "18:00",
          l: "Plaza de Vicenzo",
          c: "Horacio Salgado",
          t: "41, 42",
        },
      ],

      25: [{ h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "9" }],

      26: [
        {
          h: "09:00",
          l: "Fructuoso Díaz y Patricias Argentinas",
          c: "Diego Sarraute",
          t: "36",
        },
        { type: "reunion", l: "Reunión 19:30 pm" },
      ],

      27: [{ h: "09:00", l: "Andes y Fournier", c: "Francisco Araoz", t: "1" }],

      28: [
        {
          h: "09:30",
          l: "Golf Club Argentino y Golf Club Santa Lucía",
          c: "Elvio Casco",
          t: "47",
        },
        {
          h: "18:00",
          l: "Golf Club Argentino y Salta Polo Club",
          c: "Horacio Salgado",
          t: "48",
        },
        {
          h: "19:00",
          l: "Pred. pública Estación Garín",
          c: "Adolfo Gutiérrez",
        },
      ],
    },
  };

  const CALENDARIO = [FEB_2026];

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
    getEntriesForDate,
    getTodayText,
    getDayText,
  };
})();