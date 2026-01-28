/* =========================
   SALIDAS - CALENDARIO ÚNICO (COMPARTIDO)
   Visible: 28 Ene 2026 -> 28 Feb 2026
   Reglas:
   - Mañana: 09:00 hs (salvo indicación explícita)
   - Tarde: 18:00 hs
   - Jueves: Reunión 19:30 pm (no salida tarde)
   - Domingo: Reunión 9:30 am
   - Sábados: 19:00 Predicación pública Estación Garín
   - Viernes por la tarde: NO hay salidas
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

  // =========================
  // ENERO 2026 (solo desde el 28)
  // =========================
  const JAN_2026 = {
    y: 2026,
    m: 1,
    d: {
      28: [{ h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "27" }],
      29: [
        {
          h: "09:00",
          l: "Patricias Arg. y F. Díaz",
          c: "Diego Sarraute",
          t: "36",
        },
        { type: "reunion", l: "Reunión 19:30 pm" },
      ],
      30: [
        {
          h: "09:00",
          l: "Storni y Fructuoso Díaz",
          c: "Francisco Araoz",
          t: "4",
        },
        { h: "18:00", l: "Familia Segovia", c: "Lucas Segovia", t: "18" },
      ],
      31: [
        { h: "09:30", l: "Ravignani y Concordia", c: "Daniel Albis", t: "53" },
        { h: "18:00", l: "Puente 5", c: "Horacio Salgado", t: "57" },
        { h: "19:00", l: "Pred. pública Estación", c: "Adolfo Gutiérrez" },
      ],
    },
  };

  // =========================
  // FEBRERO 2026 (completo)
  // =========================
  const FEB_2026 = {
    y: 2026,
    m: 2,
    d: {
      1: [{ type: "reunion", l: "Reunión 9:30 am" }],

      2: [
        { h: "09:00", l: "Hermana Carmen Casas", c: "Diego Sarraute", t: "11" },
        {
          h: "18:00",
          l: "Rastreador Fournier y Cigliutti",
          c: "Diego Sarraute",
          t: "1",
        },
      ],

      3: [
        {
          h: "09:00",
          l: "Andes y 1° de Mayo",
          c: "Diego Sarraute",
          t: "37",
        },
        { h: "18:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "39" },
      ],

      4: [
        { h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "9" },
      ],

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
          l: "Fructuoso Diaz y Magallanes",
          c: "Francisco Araoz",
          t: "31",
        },
        // Viernes tarde: NO hay salida
      ],

      7: [
        { h: "10:00", l: "Predicación de Grupo (4 grupos)" },
        { h: "–", l: "G1 – Flia Segovia", c: "Diego Sarraute", t: "19" },
        { h: "–", l: "G2 – Hermana Doris", c: "Manuel Feril", t: "23" },
        {
          h: "–",
          l: "G3 – Andes y 1° de Mayo",
          c: "Darío Cortez",
          t: "38",
        },
        { h: "–", l: "G4 – Familia Durán", c: "Caetano Ferrari", t: "22" },
        {
          h: "18:00",
          l: "Golf Club Argentino y Jockey Club",
          c: "León Segovia",
          t: "51",
        },
        { h: "19:00", l: "Pred. pública Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      8: [{ type: "reunion", l: "Reunión 9:30 am" }],

      9: [
        { h: "09:00", l: "Hermana Carmen Casas", c: "Diego Sarraute", t: "16" },
        {
          h: "18:00",
          l: "Francia y San Martín",
          c: "Diego Sarraute",
          t: "8",
        },
      ],

      10: [
        {
          h: "09:00",
          l: "Francia y San Martín",
          c: "Diego Sarraute",
          t: "13",
        },
        { type: "reunion", l: "Reunión (Visita del Superintendente)" },
      ],

      11: [
        {
          h: "09:00",
          l: "Familia Miño",
          c: "Mauricio Tierno",
          t: "12",
        },
        {
          h: "18:00",
          l: "Hermana Fany Villantoy",
          c: "Mauricio Tierno",
          t: "17, 25",
        },
      ],

      12: [
        {
          h: "09:00",
          l: "Hermana Cintia Cancino",
          c: "Mauricio Tierno",
          t: "30, 32",
        },
        { type: "reunion", l: "Reunión 19:30 pm" },
      ],

      13: [
        { h: "09:00", l: "Familia Segovia", c: "Mauricio Tierno", t: "18" },
        // Viernes tarde: NO hay salida (aunque era visita)
      ],

      14: [
        { h: "09:00", l: "Salón del Reino", c: "Mauricio Tierno", t: "3, 4, 6, 10" },
        {
          h: "18:00",
          l: "Hermano Manuel Feril",
          c: "Mauricio Tierno",
          t: "20, 21, 28",
        },
        { h: "19:00", l: "Pred. pública Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      15: [{ type: "reunion", l: "Reunión 9:30 am" }],

      16: [
        {
          h: "09:00",
          l: "Uruguay y Centenario",
          c: "Diego Sarraute",
          t: "14",
        },
        {
          h: "18:00",
          l: "Colon y San Martin",
          c: "Diego Sarraute",
          t: "7",
        },
      ],

      17: [
        { h: "09:00", l: "Colón y Beliera", c: "Diego Sarraute", t: "24" },
        { h: "18:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "44" },
      ],

      18: [
        { h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "15" },
      ],

      19: [
        { h: "09:00", l: "Falco y Magallanes", c: "Diego Sarraute", t: "33" },
        { type: "reunion", l: "Reunión 19:30 pm" },
      ],

      20: [
        { h: "09:00", l: "Andes y Ressio", c: "Francisco Araoz", t: "2" },
        // Viernes tarde: NO hay salida
      ],

      21: [
        {
          h: "09:00",
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
        { h: "19:00", l: "Pred. pública Estación Garín", c: "Adolfo Gutiérrez" },
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
          l: "Fructuoso Diaz y Maipú",
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

      25: [
        { h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "9" },
      ],

      26: [
        {
          h: "09:00",
          l: "Fructuoso Diaz y Patricias Argentinas",
          c: "Diego Sarraute",
          t: "36",
        },
        { type: "reunion", l: "Reunión 19:30 pm" },
      ],

      27: [
        { h: "09:00", l: "Andes y Fournier", c: "Francisco Araoz", t: "1" },
        // Viernes tarde: NO hay salida
      ],

      28: [
        {
          h: "09:00",
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
        { h: "19:00", l: "Pred. pública Estación Garín", c: "Adolfo Gutiérrez" },
      ],
    },
  };

  const CALENDARIO = [JAN_2026, FEB_2026];

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
    const hasHora = h && h !== "–" && !h.includes("–"); // evita "– hs" en resumen
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
    JAN_2026,
    FEB_2026,
    getEntriesForDate,
    getTodayText,
    getDayText,
  };
})();