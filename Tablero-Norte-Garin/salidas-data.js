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
  //   MARZO 2026
  // =========================
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

      5: [{ h: "09:00", l: "Magallanes y Fructuoso Díaz", c: "León Segovia", t: "31" }],

      6: [{ h: "09:00", l: "San Martín y Colón", c: "Francisco Araoz", t: "8" }],

      7: [
        { h: "09:30", l: "Predicación de Grupo" },
        { h: "09:30", l: "Grupo 1 – Familia Segovia", c: "Daniel Albis", t: "18" },
        { h: "09:30", l: "Grupo 2 – Hna. Fany Villantoy", c: "Horacio Salgado", t: "25" },
        { h: "09:30", l: "Grupo 3 – Familia Miño", c: "Elvio Casco", t: "17" },
        { h: "09:30", l: "Grupo 4 – Familia Durán", c: "Lucas Segovia", t: "20" },
        { h: "19:00", l: "Pred. pública Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      8: [{ type: "reunion", l: "Reunión por la mañana" }],

      9: [{ h: "09:00", l: "Hna. Carmen Casas", c: "León Segovia", t: "16" }],

      10: [
        { h: "09:00", l: "Paso y Centenario", c: "—", t: "12" },
        { h: "18:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "41, 42" },
      ],

      11: [
        { h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "15" },
        { h: "19:00", l: "Predicación Telefónica (Zoom)", c: "Mario Segovia" },
      ],

      12: [{ h: "09:00", l: "Beliera y Fructuoso Díaz", c: "León Segovia", t: "32" }],

      13: [{ h: "09:00", l: "Cigliutti y Ressio", c: "Francisco Araoz", t: "3" }],

      14: [
        { type: "feriado", l: "DÍA PREDICACIÓN EXTENDIDA (Mañana 9:00 hs)" },
        { h: "09:00", l: "Salón del Reino", c: "Horacio Salgado", t: "—" },
        { h: "–", l: "Grupo 1", c: "León Segovia", t: "57" },
        { h: "–", l: "Grupo 2", c: "Mario Segovia", t: "55" },
        { h: "–", l: "Grupo 3", c: "Darío Cortez", t: "48" },
        { h: "–", l: "Grupo 4", c: "Adolfo Gutierrez", t: "56" },
        { h: "16:30", l: "Concordia y Ambrosetti", c: "Horacio Salgado", t: "54" },
        { h: "18:00", l: "Concordia y Ravignani", c: "Lucas Segovia", t: "53" },
        { h: "19:00", l: "Pred. pública Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      15: [{ type: "reunion", l: "Reunión por la mañana" }],

      16: [{ h: "09:00", l: "Hna. Carmen Casas", c: "León Segovia", t: "6" }],

      17: [
        { h: "09:00", l: "Storni y Fructuoso Díaz", c: "—", t: "4" },
        { h: "18:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "40" },
      ],

      18: [{ h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "9" }],

      19: [{ h: "09:00", l: "Falco y 1.º de Mayo", c: "León Segovia", t: "33" }],

      20: [{ h: "09:00", l: "Uruguay y Centenario", c: "Francisco Araoz", t: "21" }],

      21: [
        
      ],

      22: [{ type: "reunion", l: "Reunión por la mañana" }],

      23: [{ h: "09:00", l: "Hna. Carmen Casas", c: "León Segovia", t: "10" }],

      24: [
        { type: "feriado", l: "Feriado (horario 10:00 hs)" },
        { h: "10:00", l: "Fructuoso Díaz y Beliera", c: "—", t: "26" },
      ],

      25: [
        { h: "09:00", l: "Familia Flores", c: "Francisco Araoz", t: "27" },
        { h: "19:00", l: "Predicación Telefónica (Zoom)", c: "Mario Segovia" },
      ],

      26: [{ h: "09:00", l: "Maipú y Fructuoso Díaz", c: "León Segovia", t: "35" }],

      27: [{ h: "09:00", l: "Colón y Beliera", c: "Francisco Araoz", t: "29" }],

      28: [{ h: "09:30", l: "Predicación de Grupo" },
        { h: "–", l: "Grupo 1 – Colón y Vicente Lopez", c: "Daniel Quaranta", t: "24" },
        { h: "–", l: "Grupo 2 – Paso y San Martín", c: "Manuel Feril", t: "7" },
        { h: "–", l: "Grupo 3 – Francia y Centenario", c: "Pablo Zuñiga", t: "14" },
        { h: "–", l: "Grupo 4 – Francia y Alte Brown", c: "Caetano Ferrari", t: "22" },
        
        { h: "19:00", l: "Pred. pública Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      29: [{ type: "reunion", l: "Reunión por la mañana" }],

      30: [{ h: "09:00", l: "Hna. Carmen Casas", c: "León Segovia", t: "11" }],

      31: [
        { h: "09:00", l: "Colón y Centenario", c: "Diego Sarraute", t: "13" },
        { h: "18:00", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "40" },
      ],
    },
  };

  // =========================
  //   ABRIL 2026
  // =========================
  const ABR_2026 = {
    y: 2026,
    m: 4,
    d: {
      1: [{ h: "09:30", l: "Familia Flores", c: "Francisco Araoz", t: "15" }],

      2: [
        { type: "feriado", l: "FERIADO" },
        { h: "10:00", l: "Patricias Argentinas y Fructuoso Díaz", c: "Diego Sarraute", t: "36" },
      ],

      3: [
        { type: "feriado", l: "FERIADO" },
        { h: "10:00", l: "Francia y Alte Brown", c: "Francisco Araoz", t: "23" },
      ],

      4: [
        { h: "09:30", l: "Predicación de Grupo" },
        { h: "09:30", l: "Grupo 1 – Colón y Vicente López", c: "León Segovia", t: "24" },
        { h: "09:30", l: "Grupo 2 – Paso y San Martin", c: "Mario Segovia", t: "7" },
        { h: "09:30", l: "Grupo 3 – Francia y Centenario", c: "Pablo Zuñiga", t: "14" },
        { h: "09:30", l: "Grupo 4 – Francia y Alte Brown", c: "Caetano Ferrari", t: "22" },
         { h: "19:00", l: "Pred. pública Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      5: [{ type: "reunion", l: "Reunión por la mañana" }],

      6: [{ h: "09:30", l: "Carmen Casas", c: "Diego Sarraute", t: "16" }],

      7: [{ h: "17:30", l: "Plaza De Vicenzo", c: "Mabel Zúñiga", t: "39" }],

      8: [
        { h: "09:30", l: "Familia Flores", c: "Francisco Araoz", t: "9" },
        { h: "–", l: "Predicación Telefónica (Zoom)", c: "Mario Segovia" },
      ],

      9: [{ h: "09:30", l: "Magallanes y Fructuoso Díaz", c: "Diego Sarraute", t: "31" }],

      10: [{ h: "09:30", l: "Francia y San Martín", c: "Francisco Araoz", t: "8" }],

      11: [
        { h: "09:30", l: "Predicación de Grupo" },
        { h: "09:30", l: "Grupo 1 – Golf Club Argentino y Jockey Club", c: "D. Albis", t: "57" },
        { h: "09:30", l: "Grupo 2 – Puente 5", c: "Elias Coria", t: "55" },
        { h: "09:30", l: "Grupo 3 – Argentino Golf Club y Salta Polo Club", c: "Darío Cortez", t: "48" },
        { h: "09:30", l: "Grupo 4 – Ambrosetti y Concordia", c: "Adolfo Gutiérrez", t: "56" },
         { h: "19:00", l: "Pred. pública Estación Garín", c: "Adolfo Gutiérrez" }
      ],

      12: [{ type: "reunion", l: "Reunión por la mañana" }],

      13: [{ h: "09:30", l: "Hermana Carmen Casas", c: "Diego Sarraute", t: "11" }],

      14: [{ h: "17:30", l: "Plaza de Vicenzo", c: "Mabel Zuñiga", t: "43" }],

      15: [{ h: "09:30", l: "Familia Flores", c: "Francisco Araoz", t: "27" }],

      16: [{ h: "09:30", l: "Patricias Argentinas y Calle 3", c: "Diego Sarraute", t: "34" }],

      17: [{ h: "09:30", l: "Paso y San Martin", c: "Francisco Araoz", t: "12" }],

      18: [
        { h: "09:30", l: "Predicación de Grupo" },
        { h: "09:30", l: "Grupo 1 – Familia Segovia", c: "León Segovia", t: "18" },
        { h: "09:30", l: "Grupo 2 – Hermano Manuel Feril", c: "Manuel Feril", t: "21" },
        { h: "09:30", l: "Grupo 3 – Familia Miño", c: "Elvio Casco", t: "17" },
        { h: "09:30", l: "Grupo 4 – Familia Duran", c: "Adolfo Gutiérrez", t: "20" },
         { h: "19:00", l: "Pred. pública Estación Garín", c: "Adolfo Gutiérrez" }
      ],

      19: [{ type: "reunion", l: "Reunión por la mañana" }],

      20: [{ h: "09:30", l: "Hermana Carmen Casas", c: "Diego Sarraute", t: "6" }],

      21: [{ h: "17:30", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "44" }],

      22: [{ h: "09:30", l: "Familia Flores", c: "Francisco Araoz", t: "33" }],

      23: [{ h: "09:30", l: "Fructuoso Díaz y Vicente López", c: "Diego Sarraute", t: "25" }],

      24: [{ h: "09:30", l: "Ressio y Cigliutti", c: "Francisco Araoz", t: "3" }],

      25: [
        { h: "09:30", l: "Reunión p/el serv. del campo: Salón del Reino", c: "Mario Segovia" },
        { h: "09:30", l: "Grupo 1", c: "—", t: "49" },
        { h: "09:30", l: "Grupo 2", c: "—", t: "50" },
        { h: "09:30", l: "Grupo 3", c: "—", t: "51" },
        { h: "09:30", l: "Grupo 4", c: "—", t: "54" },
         { h: "19:00", l: "Pred. pública Estación Garín", c: "Adolfo Gutiérrez" }
      ],

      26: [{ type: "reunion", l: "Reunión por la mañana" }],

      27: [{ h: "09:30", l: "Hermana Carmen Casas", c: "Diego Sarraute", t: "10" }],

      28: [{ h: "17:30", l: "Plaza De Vicenzo", c: "Horacio Salgado", t: "46" }],

      29: [
        { h: "09:30", l: "Familia Flores", c: "Francisco Araoz", t: "15" },
        { h: "19:00", l: "Predicación Telefónica (Zoom)", c: "Mario Segovia" },
      ],

      30: [{ h: "09:30", l: "Fructuoso Díaz y Storni", c: "Diego Sarraute", t: "4" }],
    },
  };

  // =========================
  //   MAYO 2026
  // =========================
  const MAY_2026 = {
    y: 2026,
    m: 5,
    d: {
      1: [
        { type: "feriado", l: "FERIADO (Día del Trabajador)" },
        { h: "10:00", l: "Casa Doris Talarico", c: "Diego Sarraute", t: "23" },
      ],

      2: [
        { h: "09:30", l: "Grupo 1 – 1° de Mayo y Fructuoso Díaz", c: "León Segovia", t: "35" },
        { h: "09:30", l: "Grupo 2 – Colón y San Martín", c: "Mario Segovia", t: "8" },
        { h: "09:30", l: "Grupo 3 – Fructuoso Díaz y Magallanes", c: "Pablo Zúñiga", t: "31" },
        { h: "09:30", l: "Grupo 4 – Fructuoso Díaz y Patricias Argentinas", c: "Adolfo Gutiérrez", t: "36" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      3: [{ type: "reunion", l: "Reunión de congregación" }],

      4: [{ h: "09:30", l: "Casa Carmen Casas", c: "Diego Sarraute", t: "16" }],

      5: [{ h: "17:30", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "40" }],

      6: [{ h: "09:30", l: "Familia Flores", c: "Francisco Araoz", t: "9" }],

      7: [{ h: "09:30", l: "Beliera y Fructuoso Díaz", c: "Diego Sarraute", t: "32" }],

      8: [{ h: "09:30", l: "Casa Doris Talarico", c: "León Segovia", t: "19" }],

      9: [
        { h: "09:30", l: "Uruguay y Oliveira César", c: "Horacio Salgado", t: "28" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      10: [{ type: "reunion", l: "Reunión de congregación" }],

      11: [{ h: "09:30", l: "Casa Carmen Casas", c: "Diego Sarraute", t: "11" }],

      12: [{ h: "17:30", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "41" }],

      13: [
        { h: "09:30", l: "Familia Flores", c: "Francisco Araoz", t: "27" },
        { h: "19:00", l: "Predicación Telefónica (Zoom)", c: "Juan Carlos Sánchez" },
      ],

      14: [{ h: "09:30", l: "Colón y Oliveira César", c: "Diego Sarraute", t: "29" }],

      15: [{ h: "09:30", l: "Casa Doris Talarico", c: "León Segovia", t: "24" }],

      16: [
        { h: "09:30", l: "Grupo 1 – Familia Segovia", c: "Horacio Salgado", t: "17" },
        { h: "09:30", l: "Grupo 2 – Casa Carmen Casas", c: "Elías Coria", t: "3" },
        { h: "09:30", l: "Grupo 3 – Familia Miño", c: "Darío Cortez", t: "12" },
        { h: "09:30", l: "Grupo 4 – Familia Durán", c: "Samuel Durán", t: "20" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      17: [{ type: "reunion", l: "Reunión de congregación" }],

      18: [{ h: "09:30", l: "Casa Carmen Casas", c: "Diego Sarraute", t: "6" }],

      19: [{ h: "17:30", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "45" }],

      20: [{ h: "09:30", l: "Familia Flores", c: "Francisco Araoz", t: "33" }],

      21: [{ h: "09:30", l: "Colón y Paso", c: "Diego Sarraute", t: "7" }],

      22: [{ h: "09:30", l: "Casa Doris Talarico", c: "León Segovia", t: "18" }],

      23: [
        { h: "09:30", l: "Salón del Reino", c: "Lucas Segovia", t: "52" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      24: [{ type: "reunion", l: "Reunión de congregación" }],

      25: [
        { type: "feriado", l: "FERIADO (25 de Mayo)" },
        { h: "10:00", l: "Casa Carmen Casas", c: "Diego Sarraute", t: "10" },
      ],

      26: [{ h: "17:30", l: "Plaza de Vicenzo", c: "Horacio Salgado", t: "46" }],

      27: [
        { h: "09:30", l: "Familia Flores", c: "Francisco Araoz", t: "15" },
        { h: "19:00", l: "Predicación Telefónica (Zoom)", c: "Mario Segovia" },
      ],

      28: [{ h: "09:30", l: "Uruguay y Centenario", c: "Diego Sarraute", t: "14" }],

      29: [{ h: "09:30", l: "Casa Doris Talarico", c: "León Segovia", t: "23" }],

      30: [
        { h: "09:30", l: "Grupo 1 – Francia y Alte Brown", c: "Diego Sarraute", t: "22" },
        { h: "09:30", l: "Grupo 2 – Casa Fanny Villantoy", c: "Horacio Salgado", t: "25" },
        { h: "09:30", l: "Grupo 3 – Uruguay y Oliveira César", c: "Cristian Segovia", t: "21" },
        { h: "09:30", l: "Grupo 4 – Storni y Fructuoso Díaz", c: "Caetano Ferrari", t: "4" },
        { h: "18:00", l: "Pred. Pública · Estación Garín", c: "Adolfo Gutiérrez" },
      ],

      31: [{ type: "reunion", l: "Reunión de congregación" }],
    },
  };

  const CALENDARIO = [MAR_2026, ABR_2026, MAY_2026];

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
    MAR_2026,
    ABR_2026,
    MAY_2026,
    getEntriesForDate,
    getTodayText,
    getDayText,
  };
})();
