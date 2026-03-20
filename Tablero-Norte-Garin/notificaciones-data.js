// notificaciones-data.js
// Datos centralizados de asignaciones para el sistema de notificaciones.
// Se actualiza junto con los demás archivos de datos de la congregación.

window.NOTIF_DATA = {

  // ── VIDA Y MINISTERIO ──────────────────────────────────────────────────────
  // data-key = lunes de la semana de la reunión (jueves).
  // presidente: nombre normalizado (sin tildes, mayúsculas).
  // partes: lista de todos los hermanos con participación esa semana.
  vidaMinisterio: [
    {
      key: "2026-01-05", titulo: "5–11 de Enero",
      presidente: "LEON SEGOVIA",
      partes: ["MARIO SEGOVIA","CAETANO FERRARI","HECTOR PALAVECINO",
               "ELIDA BENITEZ","MORELIA HARLOS","ANGELA CESPEDES",
               "NELIDA BECERRA","SEBASTIAN MESA","HORACIO SALGADO",
               "LUCAS SEGOVIA","JUAN CARLOS SANCHEZ"]
    },
    {
      key: "2026-01-12", titulo: "12–18 de Enero",
      presidente: "MARIO SEGOVIA",
      partes: ["LUCAS SEGOVIA","DIEGO SARRAUTE","LUCAS GALEANO",
               "DANIEL COLLADO","DANIEL QUARANTA","MICAELA SARRAUTE",
               "CARMEN CASAS","PAULINA LLORENTE","TEODORA DUCOLI",
               "BENJAMIN DURAN","HORACIO SALGADO","DARIO CORTEZ",
               "CAETANO FERRARI"]
    },
    {
      key: "2026-01-19", titulo: "19–25 de Enero",
      presidente: "DANIEL ALBIS",
      partes: ["CAETANO FERRARI","LUCAS SEGOVIA","FRANCO GALEANO",
               "MORELIA HARLOS","MARTINA HUAMACONDOR","CARMEN CASAS",
               "MIRTA SEGOVIA","BIBIANA PALACIOS","ROXANA PALAVECINO",
               "DARIO CORTEZ","ADOLFO GUTIERREZ","DIEGO SARRAUTE"]
    },
    {
      key: "2026-01-26", titulo: "26 Ene – 1 Feb",
      presidente: "LUCAS SEGOVIA",
      partes: ["DIEGO SARRAUTE","DARIO CORTEZ","JUAN CARLOS SANCHEZ",
               "YANINA GALEANO","ALICIA SANCHEZ","CECILIA LEAL",
               "ALICIA VERA","SABRINA SEGOVIA","TAMARA NATALE",
               "CAETANO FERRARI","ELVIO CASCO","DANIEL QUARANTA",
               "LEON SEGOVIA"]
    },
    {
      key: "2026-02-02", titulo: "2–8 de Febrero",
      presidente: "DARIO CORTEZ",
      partes: ["ADOLFO GUTIERREZ","DIEGO SARRAUTE","GUILLERMO MINO",
               "MICAELA SARRAUTE","NORMA BARRERA","DORIS TALLARICO",
               "CARMEN CASAS","LIDIA CANSINO","MONICA CASCO",
               "ELVIO CASCO","HORACIO SALGADO"]
    },
    {
      key: "2026-02-09", titulo: "9–15 de Febrero",
      presidente: "ADOLFO GUTIERREZ",
      partes: ["ELVIO CASCO","HORACIO SALGADO","FEDERICO PALLADINO",
               "ALICIA SANCHEZ","CINTIA CANSINO","TAMARA NATALE",
               "MELANY PEREYRA","CAETANO FERRARI","DANIEL ALBIS",
               "MAURICIO TIERNO","CRISTIAN SEGOVIA","LEON SEGOVIA"]
    },
    {
      key: "2026-02-16", titulo: "16–22 de Febrero",
      presidente: "ELVIO CASCO",
      partes: ["HORACIO SALGADO","LEON SEGOVIA","FRANCISCO ARAOZ",
               "SOFIA ZUNIGA","ANDREA GUTIERREZ","ROXANA PALAVECINO",
               "LIDIA CANSINO","MONICA CASCO","CECILIA LELA",
               "DIEGO SARRAUTE","MARIO SEGOVIA","DANIEL ALBIS"]
    },
    // 2026-02-23: ASAMBLEA DE CIRCUITO – sin partes
    {
      key: "2026-03-02", titulo: "2–8 de Marzo",
      presidente: "LEON SEGOVIA",
      partes: ["DIEGO SARRAUTE","DANIEL ALBIS","CRISTIAN SEGOVIA",
               "ANGELA CESPEDES","ALICIA VERA","TEODORA DUCOLI",
               "MIRTA SEGOVIA","MANUEL FERIL","HORACIO SALGADO",
               "MARIO SEGOVIA","LUCAS SEGOVIA","DARIO CORTEZ"]
    },
    {
      key: "2026-03-09", titulo: "9–15 de Marzo",
      presidente: "MARIO SEGOVIA",
      partes: ["DANIEL ALBIS","CAETANO FERRARI","SEBASTIAN MEZA",
               "TAMARA NATALE","MARTINA HUAMACONDOR","ALICIA SANCHEZ",
               "FEDERICO PALLADINO","HECTOR PALAVECINO","JOSE CANCINO",
               "DANTER HUAMACONDOR","LUCAS SEGOVIA","DARIO CORTEZ",
               "ELVIO CASCO"]
    },
    {
      key: "2026-03-16", titulo: "16–22 de Marzo",
      presidente: "DANIEL ALBIS",
      partes: ["LUCAS SEGOVIA","DARIO CORTEZ","GUSTAVO DUCOLI",
               "MANUEL FERIL","FRANCISCO ARAOZ","LEON CANSINO",
               "SAMUEL DURAN","PABLO ZUNIGA","BENJAMIN DURAN",
               "DIEGO SARRAUTE","ADOLFO GUTIERREZ","CAETANO FERRARI",
               "ELVIO CASCO"]
    },
    {
      key: "2026-03-23", titulo: "23–29 de Marzo",
      presidente: "LUCAS SEGOVIA",
      partes: ["DARIO CORTEZ","CAETANO FERRARI","TOMAS DURAN",
               "MELANY PEREIRA","SUSANA ARAOZ","GUILLERMINA LEIVA",
               "FANNY VILLANTOY","MORELIA HARLOS","MABEL MINO",
               "ADOLFO GUTIERREZ","ELVIO CASCO","DANIEL QUARANTA",
               "CRISTIAN SEGOVIA"]
    },
    // 2026-03-30: CONMEMORACIÓN – sin partes regulares
    {
      key: "2026-04-06", titulo: "6–12 de Abril",
      presidente: "ADOLFO GUTIERREZ",
      partes: ["LEON SEGOVIA","DIEGO SARRAUTE","DANTER HUAMACONDOR",
               "BENJAMIN DURAN","DANIEL QUARANTA","SAMUEL DURAN",
               "JOSE CANCINO","PABLO ZUNIGA","CRISTIAN SEGOVIA",
               "DANIEL ALBIS","MARIO SEGOVIA"]
    },
    {
      key: "2026-04-13", titulo: "13–19 de Abril",
      presidente: "ELVIO CASCO",
      partes: ["HORACIO SALGADO","LEON SEGOVIA","TOMAS DURAN",
               "ALICIA VERA","ANGELA CESPEDES","CARMEN CASAS",
               "NELLY BECERRA","CECILIA LEAL","PAULINA LAURENTE",
               "CAETANO FERRARI","MARIO SEGOVIA","DIEGO SARRAUTE"]
    },
    {
      key: "2026-04-20", titulo: "20–26 de Abril",
      presidente: "HORACIO SALGADO",
      partes: ["DIEGO SARRAUTE","MARIO SEGOVIA","LEON CANCINO",
               "NORMA BARRERA","MABEL MINO","TAMARA NATALE",
               "GIULIANA SEGOVIA","MELANIE PEREIRA","SOFIA ZUNIGA",
               "BENJAMIN DURAN","CAETANO FERRARI","LUCAS SEGOVIA",
               "CRISTIAN SEGOVIA"]
    },
    {
      key: "2026-04-27", titulo: "27 Abr – 3 May",
      presidente: "LEON SEGOVIA",
      partes: ["MARIO SEGOVIA","DANIEL ALBIS","GUILLERMO MINO",
               "TOMAS DURAN","MANUEL FERIL","JUAN CARLOS SANCHEZ",
               "CRISTIAN SEGOVIA","GUSTAVO DUCOLI","LUCAS SEGOVIA",
               "ELVIO CASCO"]
    },
    {
      key: "2026-05-04", titulo: "4–10 de Mayo",
      presidente: "MARIO SEGOVIA",
      partes: ["DANIEL ALBIS","LUCAS SEGOVIA","DANIEL COLLADO",
               "LUCINDA DURAN","CARMEN CASAS","MABEL ZUNIGA",
               "ROXANA PALAVECINO","PABLO ZUNIGA","DIEGO SARRAUTE",
               "DARIO CORTEZ"]
    },
  ],

  // ── LECTORES ──────────────────────────────────────────────────────────────
  // fecha: "YYYY-MM-DD" (domingo para La Atalaya, jueves para Est. Bíblico)
  // tipo: "atalaya" | "biblico"
  // nombre: normalizado (sin tildes, mayúsculas)
  lectores: [
    // Febrero 2026
    { fecha: "2026-02-01", tipo: "atalaya",  nombre: "MARIO SEGOVIA" },
    { fecha: "2026-02-05", tipo: "biblico",  nombre: "LUCAS SEGOVIA" },
    { fecha: "2026-02-08", tipo: "atalaya",  nombre: "HORACIO SALGADO" },
    { fecha: "2026-02-19", tipo: "biblico",  nombre: "ADOLFO GUTIERREZ" },
    { fecha: "2026-02-22", tipo: "atalaya",  nombre: "DANIEL ALBIS" },
    // Marzo 2026
    { fecha: "2026-03-05", tipo: "biblico",  nombre: "DIEGO SARRAUTE" },
    { fecha: "2026-03-08", tipo: "atalaya",  nombre: "ADOLFO GUTIERREZ" },
    { fecha: "2026-03-12", tipo: "biblico",  nombre: "HORACIO SALGADO" },
    { fecha: "2026-03-15", tipo: "atalaya",  nombre: "LEON SEGOVIA" },
    { fecha: "2026-03-19", tipo: "biblico",  nombre: "DANIEL ALBIS" },
    { fecha: "2026-03-22", tipo: "atalaya",  nombre: "LUCAS SEGOVIA" },
    { fecha: "2026-03-26", tipo: "biblico",  nombre: "DARIO CORTEZ" },
    { fecha: "2026-03-29", tipo: "atalaya",  nombre: "DARIO CORTEZ" },
  ],

  // ── DISCURSOS DEL DOMINGO ─────────────────────────────────────────────────
  // fecha: "YYYY-MM-DD" (domingo)
  // chairman: quien preside la reunión (normalizado)
  // speaker: orador (si es de nuestra congregación, esLocal=true)
  conferencias: [
    { fecha: "2026-01-04", chairman: "LUCAS SEGOVIA",    speaker: "ENZO MODICA",       esLocal: false },
    { fecha: "2026-01-11", chairman: "CAETANO FERRARI",  speaker: "AGUSTIN GALINDEZ",  esLocal: false },
    { fecha: "2026-01-18", chairman: "ELVIO CASCO",      speaker: null,                esLocal: false },
    { fecha: "2026-01-25", chairman: "LEON SEGOVIA",     speaker: "ELVIO CASCO",       esLocal: true  },
    { fecha: "2026-02-01", chairman: "HORACIO SALGADO",  speaker: "DANIEL ALBIS",      esLocal: true  },
    { fecha: "2026-02-08", chairman: "ADOLFO GUTIERREZ", speaker: "LUCAS SEGOVIA",     esLocal: true  },
    { fecha: "2026-02-15", chairman: "HORACIO SALGADO",  speaker: "MAURICIO TIERNO",   esLocal: false },
    { fecha: "2026-02-22", chairman: "MARIO SEGOVIA",    speaker: "SANTIAGO VEGA",     esLocal: false },
    // Mar 1: Asamblea de Circuito
    { fecha: "2026-03-08", chairman: "DARIO CORTEZ",     speaker: "HERNAN CARRERAS",   esLocal: false },
    { fecha: "2026-03-15", chairman: "CAETANO FERRARI",  speaker: "ADRIAN PERILLO",    esLocal: false },
    { fecha: "2026-03-22", chairman: "ADOLFO GUTIERREZ", speaker: "MARIO SEGOVIA",     esLocal: true  },
    { fecha: "2026-03-29", chairman: "LEON SEGOVIA",     speaker: "JULIAN GIACOBBE",   esLocal: false },
  ],

  // ── LIMPIEZA ──────────────────────────────────────────────────────────────
  // La rotación se calcula dinámicamente (igual que limpieza.html).
  // Se usa: INICIO_REFERENCIA = 2 dic 2025, alternando "Grupos 1 y 2" / "Grupos 3 y 4".
  limpieza: {
    inicioReferencia: new Date(2025, 11, 2), // 2 dic 2025
    secuencia: ["Grupos 1 y 2","Grupos 3 y 4","Grupos 1 y 2","Grupos 3 y 4"]
  },

  // ── MULTIMEDIA (Audio/Video, Microfonistas, Plataforma, Acomodadores) ─────
  // inicio / fin: "YYYY-MM-DD" (rango de la semana, igual que multimedia.html)
  // Nombres normalizados (sin tildes, mayúsculas). Separador "/" para dos personas.
  // null = sin asignar o "A confirmar" → no dispara notificación.
  multimedia: [
    {
      label: "02–08 Mar",
      inicio: "2026-03-02", fin: "2026-03-08",
      audio_video:   "DARIO CORTEZ / CAETANO FERRARI",
      microfonistas: "SAMUEL DURAN / SEBASTIAN MEZA",
      plataforma:    "DANIEL ALBIS",
      entrada:       null,
      auditorio:     null,
    },
    {
      label: "09–15 Mar",
      inicio: "2026-03-09", fin: "2026-03-15",
      audio_video:   "MARIO SEGOVIA / HORACIO SALGADO",
      microfonistas: "DANIEL QUARANTA / ELIAS CORIA",
      plataforma:    "DIEGO SARRAUTE",
      entrada:       "PABLO ZUNIGA",
      auditorio:     "ADOLFO GUTIERREZ",
    },
    {
      label: "16–22 Mar",
      inicio: "2026-03-16", fin: "2026-03-22",
      audio_video:   "MARIO SEGOVIA / CAETANO FERRARI",
      microfonistas: "ELVIO CASCO / ELIAS CORIA",
      plataforma:    "DIEGO SARRAUTE",
      entrada:       "HORACIO SALGADO",
      auditorio:     "FRANCISCO ARAOZ",
    },
    {
      label: "23–30 Mar",
      inicio: "2026-03-23", fin: "2026-03-30",
      audio_video:   "DARIO CORTEZ / HORACIO SALGADO",
      microfonistas: "DANIEL QUARANTA / SAMUEL DURAN",
      plataforma:    "CAETANO FERRARI",
      entrada:       "CRISTIAN SEGOVIA",
      auditorio:     "LEON SEGOVIA",
    },
  ],

  // La lista de hermanos se genera dinámicamente desde window.GRUPOS_DATA (grupos-data.js).
};
