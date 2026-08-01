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

  // =========================
  //   JUNIO 2026
  // =========================
  const JUN_2026 = {
    y: 2026,
    m: 6,
    d: {
      1: [{ h: "10:00", l: "Casa Carmen Casas", c: "León Segovia", t: "16" }],

      2: [{ h: "17:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "40" }],

      3: [{ h: "10:00", l: "Familia Flores", c: "Francisco Araoz", t: "9" }],

      4: [{ h: "10:00", l: "Fructuoso Díaz y 1° de Mayo", c: "—", t: "35" }],

      5: [{ h: "10:00", l: "Casa Doris Talarico", c: "León Segovia", t: "19" }],

      6: [
        { h: "10:00", l: "Salida congregacional · Plaza Barrio Salas", c: "Horacio Salgado", t: "52" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      7: [{ type: "reunion", l: "Reunión de congregación" }],

      8: [{ h: "10:00", l: "Casa Carmen Casas", c: "León Segovia", t: "11" }],

      9: [{ h: "17:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "39" }],

      10: [{ h: "10:00", l: "Familia Flores", c: "Francisco Araoz", t: "27" }],

      11: [{ h: "10:00", l: "Fructuoso Díaz y Magallanes", c: "—", t: "31" }],

      12: [{ h: "10:00", l: "Casa Doris Talarico", c: "León Segovia", t: "24" }],

      13: [
        { h: "10:00", l: "Grupo 1 – Golf Club Argentino y Golf Club Santa Lucía", c: "Daniel Albis", t: "47" },
        { h: "10:00", l: "Grupo 2 – Jockey Club y Golf Club Argentino", c: "Manuel Feril", t: "50" },
        { h: "10:00", l: "Grupo 3 – Golf Club Argentino y Salta Polo Club", c: "Pablo Zúñiga", t: "48" },
        { h: "10:00", l: "Grupo 4 – Puente 5", c: "Lucas Segovia", t: "51" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      14: [{ type: "reunion", l: "Reunión de congregación" }],

      15: [{ h: "10:00", l: "Casa Carmen Casas", c: "León Segovia", t: "6" }],

      16: [{ h: "17:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "43" }],

      17: [{ h: "10:00", l: "Familia Flores", c: "Francisco Araoz", t: "33" }],

      18: [{ h: "10:00", l: "Ressio y Cigliutti", c: "—", t: "3" }],

      19: [{ h: "10:00", l: "Casa Doris Talarico", c: "León Segovia", t: "18" }],

      20: [
        { type: "feriado", l: "FERIADO" },
        { h: "10:00", l: "Salida congregacional · Casa Cintia Cancino", c: "León Segovia", t: "30, 32" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      21: [{ type: "reunion", l: "Reunión de congregación" }],

      22: [{ h: "10:00", l: "Casa Carmen Casas", c: "León Segovia", t: "10" }],

      23: [{ h: "17:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "44" }],

      24: [{ h: "10:00", l: "Familia Flores", c: "Francisco Araoz", t: "15" }],

      25: [{ h: "10:00", l: "Colón y Beliera", c: "—", t: "29" }],

      26: [{ h: "10:00", l: "Casa Doris Talarico", c: "León Segovia", t: "23" }],

      27: [
        { h: "10:00", l: "Grupo 1 – Familia Segovia", c: "León Segovia", t: "25" },
        { h: "10:00", l: "Grupo 2 – Casa Manuel Feril", c: "Horacio Salgado", t: "21" },
        { h: "10:00", l: "Grupo 3 – Paso y Centenario", c: "Elvio Casco", t: "12" },
        { h: "10:00", l: "Grupo 4 – Paso y San Martín", c: "Caetano Ferrari", t: "7" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      28: [{ type: "reunion", l: "Reunión de congregación" }],

      29: [{ h: "10:00", l: "Casa Carmen Casas", c: "León Segovia", t: "16" }],

      30: [{ h: "17:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "40" }],
    },
  };

  // =========================
  //   JULIO 2026
  // =========================
  const JUL_2026 = {
    y: 2026,
    m: 7,
    d: {
      1: [{ h: "10:00", l: "Familia Flores", c: "Francisco Araoz", t: "9" }],

      2: [{ h: "10:00", l: "Calle 3 y Patricias Argentinas", c: "Juan Carlos Sánchez", t: "34" }],

      3: [{ h: "10:00", l: "Casa Doris Talarico", c: "León Segovia", t: "19" }],

      4: [
        { h: "10:00", l: "Salida congregacional · Jockey Golf Club y Golf Club Argentino", c: "Lucas Segovia", t: "50, 51" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      5: [{ type: "reunion", l: "Reunión de congregación" }],

      6: [{ h: "10:00", l: "Casa Carmen Casas", c: "León Segovia", t: "16" }],

      7: [{ h: "17:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "41" }],

      8: [{ h: "10:00", l: "Familia Flores", c: "Francisco Araoz", t: "27" }],

      9: [
        { type: "feriado", l: "FERIADO" },
        { h: "10:00", l: "Fructuoso Díaz y Beliera", c: "Juan Carlos Sánchez", t: "26" },
      ],

      10: [{ h: "10:00", l: "Casa Doris Talarico", c: "León Segovia", t: "24" }],

      11: [
        { h: "10:00", l: "Grupo 1 – Golf Club Concordia y Ravignani", c: "León Segovia", t: "53" },
        { h: "10:00", l: "Grupo 2 – Puente 5", c: "Manuel Feril", t: "54" },
        { h: "10:00", l: "Grupo 3 – Golf Club Argentino y Salta Polo Club", c: "Elvio Casco", t: "49" },
        { h: "10:00", l: "Grupo 4 – Golf Club Argentino y Golf Club Santa Lucía", c: "Lucas Segovia", t: "47" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      12: [{ type: "reunion", l: "Reunión de congregación" }],

      13: [{ h: "10:00", l: "Casa Carmen Casas", c: "León Segovia", t: "11" }],

      14: [{ h: "17:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "45" }],

      15: [{ h: "10:00", l: "Familia Flores", c: "Francisco Araoz", t: "33" }],

      16: [{ h: "10:00", l: "Fructuoso Díaz y Patricias Argentinas", c: "Juan Carlos Sánchez", t: "36" }],

      17: [{ h: "10:00", l: "Casa Doris Talarico", c: "León Segovia", t: "18" }],

      18: [
        { h: "10:00", l: "Salida congregacional · Puente 5", c: "Elvio Casco", t: "55" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      19: [{ type: "reunion", l: "Reunión de congregación" }],

      20: [{ h: "10:00", l: "Casa Carmen Casas", c: "León Segovia", t: "6" }],

      21: [{ h: "17:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "46" }],

      22: [{ h: "10:00", l: "Familia Flores", c: "Francisco Araoz", t: "15" }],

      23: [{ h: "10:00", l: "Fructuoso Díaz y 1° de Mayo", c: "Juan Carlos Sánchez", t: "35" }],

      24: [{ h: "10:00", l: "Casa Doris Talarico", c: "León Segovia", t: "23" }],

      25: [
        { h: "10:00", l: "Grupo 1 – Almirante Brown y Francia", c: "Daniel Albis", t: "20" },
        { h: "10:00", l: "Grupo 2 – Hermana Fanny Villantoy", c: "Horacio Salgado", t: "17" },
        { h: "10:00", l: "Grupo 3 – Colón y Olivera César", c: "Pablo Zúñiga", t: "29" },
        { h: "10:00", l: "Grupo 4 – Colón y San Martín", c: "Caetano Ferrari", t: "7" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      26: [{ type: "reunion", l: "Reunión de congregación" }],

      27: [{ h: "10:00", l: "Casa Carmen Casas", c: "León Segovia", t: "10" }],

      28: [{ h: "17:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "39" }],

      29: [{ h: "10:00", l: "Familia Flores", c: "Francisco Araoz", t: "9" }],

      30: [{ h: "10:00", l: "Colón y Magallanes", c: "Juan Carlos Sánchez", t: "30" }],

      31: [{ h: "10:00", l: "Casa Doris Talarico", c: "León Segovia", t: "19" }],
    },
  };

  // =========================
  //   AGOSTO 2026
  // =========================
  const AGO_2026 = {
    y: 2026,
    m: 8,
    d: {
      1: [
        { h: "10:00", l: "Salida congregacional · Puente 5", c: "Lucas Segovia", t: "55" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      2: [{ type: "reunion", l: "Reunión de congregación" }],

      3: [{ h: "10:00", l: "Casa Carmen Casas", c: "León Segovia", t: "16" }],

      4: [{ h: "17:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "40" }],

      5: [{ h: "10:00", l: "Familia Flores", c: "Francisco Araoz", t: "9" }],

      6: [{ h: "10:00", l: "Calle 3 y Patricias Argentinas", c: "Juan Carlos Sánchez", t: "34" }],

      7: [{ h: "10:00", l: "Casa Doris Talarico", c: "León Segovia", t: "23" }],

      8: [
        { h: "10:00", l: "Grupo 1 – Golf Club Argentino y Salta Polo Club", c: "León Segovia", t: "42" },
        { h: "10:00", l: "Grupo 2 – Golf Club Argentino y Golf Club Santa Lucía", c: "Horacio Salgado", t: "48" },
        { h: "10:00", l: "Grupo 3 – Golf Club Concordia y Ravignani", c: "Elvio Casco", t: "56" },
        { h: "10:00", l: "Grupo 4 – Puente 5", c: "Lucas Segovia", t: "57" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      9: [{ type: "reunion", l: "Reunión de congregación" }],

      10: [{ h: "10:00", l: "Casa Carmen Casas", c: "León Segovia", t: "11" }],

      11: [{ h: "17:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "41" }],

      12: [
        { h: "10:00", l: "Familia Flores", c: "Mauricio Tierno", t: "27, 15" },
        { h: "17:00", l: "Familia Miño", c: "Mauricio Tierno", t: "12, 17" },
      ],

      13: [{ h: "10:00", l: "Familia Segovia", c: "Mauricio Tierno", t: "24, 25" }],

      14: [
        { h: "10:00", l: "Casa Doris Talarico", c: "Mauricio Tierno", t: "19, 22" },
        { h: "17:00", l: "Familia Godoy", c: "Mauricio Tierno", t: "32, 31" },
      ],

      15: [
        { h: "10:00", l: "Salida congregacional · Salón del Reino", c: "Mauricio Tierno", t: "3, 4, 6, 10, 11" },
        { h: "17:00", l: "Casa Manuel Feril", c: "Mauricio Tierno", t: "21, 28" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      16: [{ type: "reunion", l: "Reunión de congregación" }],

      17: [{ h: "10:00", l: "Casa Carmen Casas", c: "León Segovia", t: "6" }],

      18: [{ h: "17:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "45" }],

      19: [{ h: "10:00", l: "Familia Flores", c: "Francisco Araoz", t: "33" }],

      20: [{ h: "10:00", l: "Calle 3 y Patricias Argentinas", c: "Juan Carlos Sánchez", t: "36" }],

      21: [{ h: "10:00", l: "Casa Doris Talarico", c: "León Segovia", t: "24" }],

      22: [
        { h: "10:00", l: "Grupo 1 –", c: "", t: "" },
        { h: "10:00", l: "Grupo 2 –", c: "", t: "" },
        { h: "10:00", l: "Grupo 3 –", c: "", t: "" },
        { h: "10:00", l: "Grupo 4 –", c: "", t: "" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      23: [{ type: "reunion", l: "Reunión de congregación" }],

      24: [{ h: "10:00", l: "Casa Carmen Casas", c: "León Segovia", t: "10" }],

      25: [{ h: "17:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "46" }],

      26: [{ h: "10:00", l: "Familia Flores", c: "Francisco Araoz", t: "15" }],

      27: [{ h: "10:00", l: "Pellegrini y Maipú", c: "Juan Carlos Sánchez", t: "35" }],

      28: [{ h: "10:00", l: "Casa Doris Talarico", c: "León Segovia", t: "18" }],

      29: [
        { h: "10:00", l: "Salida congregacional · Barrio Salas", c: "Daniel Albis", t: "52" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      30: [{ type: "reunion", l: "Reunión de congregación" }],

      31: [{ h: "10:00", l: "Casa Carmen Casas", c: "León Segovia", t: "16" }],
    },
  };

  const CALENDARIO = [JUN_2026, JUL_2026, AGO_2026];

  function getEntriesForDate(date) {
    const d = startOfDay(date);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    const monthObj = CALENDARIO.find((x) => x.y === y && x.m === m);
    if (!monthObj) return [];
    return monthObj.d?.[day] || [];
  }

  function getTodayText() {
    const entries = getEntriesForDate(new Date());
    if (!entries.length) return null;
    return entries
      .map((e) => (e.type ? e.l : `${e.h || ""} ${e.l || ""}`))
      .join(" | ");
  }

  function getDayText(isoDate) {
    const d = parseISOToLocalDate(isoDate);
    const entries = getEntriesForDate(d);
    if (!entries.length) return null;
    return entries
      .map((e) => (e.type ? e.l : `${e.h || ""} ${e.l || ""}`))
      .join(" | ");
  }

  window.SALIDAS_CAL = {
    wd,
    label,
    parseTerr,
    territoryUrl,
    CALENDARIO,
    JUN_2026,
    JUL_2026,
    AGO_2026,
    getEntriesForDate,
    getTodayText,
    getDayText,
  };
})();
