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

  // ====== TUS DATOS (copiados tal cual) ======
  const DEC_2025 = {
    y: 2025,
    m: 12,
    d: {
      29: [
        { h: "09:30", l: "Hna. Casas", c: "Diego Sarraute", t: "16" },
        { h: "18:00", l: "Paso y Andes", c: "Diego Sarraute", t: "2" },
      ],
      30: [{ h: "09:30", l: "Colón y Beliera", c: "Diego Sarraute", t: "24" }],
      31: [{ h: "09:30", l: "Flia. Flores", c: "Francisco Araoz", t: "33" }],
    },
  };

  const JAN_2026 = {
    y: 2026,
    m: 1,
    d: {
      1: [{ type: "feriado", l: "Feriado Año Nuevo" }],
      2: [
        { h: "09:00", l: "Storni y Cigliutti", c: "Francisco Araoz", t: "4" },
        { h: "18:00", l: "Flia. Segovia", c: "Lucas Segovia", t: "25" },
      ],
      3: [
        {
          h: "09:30",
          l: "Fructuoso Díaz y 1.º de Mayo",
          c: "Horacio Salgado",
          t: "31",
        },
        { type: "reunion", l: "Reunión 19:30 pm" },
      ],
      4: [
        { h: "10:00", l: "Salida de grupos (4 grupos)" },
        { h: "–", l: "G1 – Familia Segovia", c: "Daniel Albis", t: "19" },
        { h: "–", l: "G2 – Familia Salgado", c: "Mario Segovia", t: "1" },
        {
          h: "–",
          l: "G3 – Patricias Arg. y Andes",
          c: "Elvio Casco",
          t: "37",
        },
        {
          h: "–",
          l: "G4 – Francia y Al. Brown",
          c: "Adolfo Gutiérrez",
          t: "20",
        },
      ],
      5: [
        { h: "09:00", l: "Hna. Carmen Casas", c: "Diego Sarraute", t: "6" },
        { h: "18:00", l: "Colón y Magallanes", c: "Diego Sarraute", t: "30" },
      ],
      6: [
        { h: "09:00", l: "Colón y Centenario", c: "Diego Sarraute", t: "12" },
        { h: "18:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "45" },
      ],
      7: [{ h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "27" }],
      8: [
        {
          h: "09:00",
          l: "Andes y Patricias Arg.",
          c: "Diego Sarraute",
          t: "38",
        },
        { type: "reunion", l: "Reunión 19:30 pm" },
      ],
      9: [
        { h: "09:00", l: "San Martín y Colón", c: "Francisco Araoz", t: "8" },
        { h: "18:00", l: "Familia Segovia", c: "Lucas Segovia", t: "18" },
      ],
      10: [
        { h: "09:30", l: "Salida de grupos" },
        {
          h: "–09:30",
          l: "Grupo 1 – Francia y Al. Brown",
          c: "Diego Sarraute",
          t: "20",
        },
        {
          h: "09:30–",
          l: "Grupo 2 – Hno Manuel Feril",
          c: "Manuel Feril",
          t: "21",
        },
        {
          h: "09:30–",
          l: "Grupo 3 – Familia Miño",
          c: "Pablo Zuñiga",
          t: "17",
        },
        {
          h: "09:30–",
          l: "Grupo 4 – Familia Durán",
          c: "Lucas Segovia",
          t: "22",
        },
        { h: "18:00", l: "F. Díaz y Beliera", c: "Lucas Segovia", t: "32" },
        { h: "19:00", l: "Pred. pública Estación", c: "Adolfo Gutiérrez" },
      ],
      11: [{ type: "reunion", l: "Reunión 9:30 am" }],
      12: [
        { h: "09:00", l: "Hna. Carmen Casas", c: "Diego Sarraute", t: "11" },
        { h: "18:00", l: "Andes y Ressio", c: "Diego Sarraute", t: "3" },
      ],
      13: [
        {
          h: "09:00",
          l: "Colón y Almirante Brown",
          c: "Diego Sarraute",
          t: "23",
        },
        { h: "18:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "46" },
      ],
      14: [{ h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "9" }],
      15: [
        { h: "09:00", l: "San Martín y Paso", c: "Diego Sarraute", t: "7" },
        { type: "reunion", l: "Reunión 19:30 pm" },
      ],
      16: [
        { h: "09:00", l: "San Martín y Colón", c: "Francisco Araoz", t: "13" },
        { h: "18:00", l: "Familia Segovia", c: "Lucas Segovia", t: "24" },
      ],
      17: [
        { h: "09:30", l: "Ambrosetti y Concordia", c: "Elvio Casco", t: "54" },
        { h: "18:00", l: "Plaza de Vicenzo", c: "León Segovia", t: "44" },
        { h: "19:00", l: "Pred. pública Estación", c: "Adolfo Gutiérrez" },
      ],
      18: [{ type: "reunion", l: "Reunión 9:30 am" }],
      19: [
        { h: "09:00", l: "Hna. Carmen Casas", c: "Diego Sarraute", t: "16" },
        {
          h: "18:00",
          l: "Centenario y Cigliutti",
          c: "Diego Sarraute",
          t: "10",
        },
      ],
      20: [
        { h: "09:00", l: "Francia y Centenario", c: "Diego Sarraute", t: "14" },
        { h: "18:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "41" },
      ],
      21: [{ h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "15" }],
      22: [
        { h: "09:00", l: "Andes y Fournier", c: "Diego Sarraute", t: "2" },
        { type: "reunion", l: "Reunión 19:30 pm" },
      ],
      23: [
        { h: "09:00", l: "Andes y 1.º de Mayo", c: "Francisco Araoz", t: "33" },
        { h: "18:00", l: "Familia Segovia", c: "Lucas Segovia", t: "25" },
      ],
      24: [
        {
          h: "09:30",
          l: "Olivera César y Uruguay",
          c: "Darío Cortez",
          t: "28",
        },
        { h: "18:00", l: "Barrio Salas", c: "Horacio Salgado", t: "52" },
        { h: "19:00", l: "Pred. pública Estación", c: "Adolfo Gutiérrez" },
      ],
      25: [{ type: "reunion", l: "Reunión 9:30 am" }],
      26: [
        { h: "09:00", l: "Hna. Carmen Casas", c: "Diego Sarraute", t: "6" },
        {
          h: "18:00",
          l: "Patricias Arg. y Calle 3",
          c: "Diego Sarraute",
          t: "34",
        },
      ],
      27: [
        {
          h: "09:00",
          l: "Fructuoso Díaz y 1.º de Mayo",
          c: "Diego Sarraute",
          t: "35",
        },
        { h: "18:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "43" },
        { h: "19:00", l: "Pred. telefónica", c: "Mario Segovia" },
      ],
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
        { h: "18:00", l: "Jockey Club", c: "Adolfo Gutiérrez", t: "57" },
        { h: "19:00", l: "Pred. pública Estación", c: "Adolfo Gutiérrez" },
      ],
    },
  };

  const CALENDARIO = [DEC_2025, JAN_2026];

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
    DEC_2025,
    JAN_2026,
    getEntriesForDate,
    getTodayText,
    getDayText,
  };
})();
