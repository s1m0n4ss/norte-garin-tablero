# Rediseño visual: informe (Fases 1 y 2)

Rama: `rediseno-visual`. No hay nada en `main` y no se tocó producción.

## Fase 1: Auditoría (medida con un navegador a 360 px de ancho, modo claro)

### Lo que hay que saber antes
- El repo **no tiene `CLAUDE.md`**. No había reglas escritas para revisar.
- El repo **no usa Firebase**. Los datos son archivos `*-data.js` estáticos. La única mención es una exclusión en `sw.js`. Territorios guarda los "no visitados" en `localStorage` del propio celular.
- El sitio **no usa clases de tamaño de Tailwind**: casi todo está en CSS propio, con `font-size` en px dentro de `<style>`. La excepción es `conferencias/index.html` (`text-xs`, `text-[10px]`).

### 1. Textos de menos de 16 px (los peores de cada página)
| Archivo | Elemento (clase) | Tamaño |
|---|---|---|
| todas las páginas | menú lateral: títulos de grupo `.nav-section-label` | 9 px |
| todas | menú: ítems `.nav-item` | 14,5 px |
| todas | subtítulo "Tablero Digital" (estilo en línea) | 10 px |
| todas | subtítulo del encabezado `.hero-sub` | 11 px |
| index.html | `.activity-label` "Resumen del día" | 9 px |
| index.html | `.slide-sublabel`, `.zoom-sub` | 10 px |
| index.html | `.section-title`, `.card-title`, `.slide-value` | 13 / 14 / 15 px |
| index.html | `.hero-date` (fecha de hoy) | 12 a 13 px |
| salidas.html | día de la semana `.dow` | 9 px |
| salidas.html | botón `.map-btn`, mes `.month-divider-label` | 10 px |
| salidas.html | hora `.entry-time`, territorio `.terr-chip` | 11 px |
| salidas.html | "Conduce:" `.entry-meta` | 12 px |
| salidas.html | `.special-entry`, `.entry-place` | 13 / 15 px |
| vida-ministerio.html | "Semana actual" `.current-badge` | 8 px |
| vida-ministerio.html | libro `.week-book`, encabezado de bloque `.prog-bloque-header`, `.viewer-week-book` | 9 px |
| vida-ministerio.html | nombre asignado `.prog-item-assigned`, duración `.prog-item-time`, `.week-cta`, `.viewer-nav-btn`, `.prog-presidente` | 10 px |
| vida-ministerio.html | "Preside:" `.week-sub`, `.prog-pie` | 12 px |
| vida-ministerio.html | título de cada parte `.prog-item-title`, `.prog-intro` | 13 px |
| conferencias.html | `.conf-meta-label` 8 px; `.day-dow` 9 px; `.conf-time` 11 px; `.conf-meta-value` 12 px | |
| lectores.html | `.lector-date-dow` 8 px; `.lector-type-badge`, `.month-sep-label` 9 px | |
| limpieza.html | `.date-pill-dow` **7,5 px**; `.summary-label`, `.week-current-badge`, `.deep-banner-eyebrow` 8 px; `.group-tag` 10 px; `.week-note` 11 px | |
| multimedia.html | `.current-chip`, `.role-label` 8 px; `.section-heading-label` 9 px; `.role-name` 12,5 px | |
| grupos.html | `.role-label` 8 px; `.grupo-count` 11 px; `.integrante-item` 12,5 px | |
| proximos-eventos.html | `.summary-label` 8 px; `.event-type`, `.hero-chip` 9 px; `.event-line` 13 px | |
| territorios/index.html | `.chip .lbl`, `.plaza-label` 10 px; `small`, `.clabel`, leyenda 11 px; `.sub`, `.tag`, `.lk`, `.nv-add`, `.nv-empty` 12 px; botones 13 px | |
| conferencias/index.html | `text-[10px]` "Programa 2026", `.badge-next` 9,6 px; `b` 11,2 px; `text-xs` | |

### 2. Bajo contraste (texto sobre fondo blanco o crema)
- El gris general `--text-muted: #8a8075` da **3,9:1** (no llega a AA 4,5:1). Se usa en todas las páginas: menú, "Conduce:", "Preside:", nombres asignados en Vida y Ministerio, días de la semana.
- "Reunión de congregación" en Salidas (`.special-entry.reunion`, verde claro): **2,5:1**.
- Libro de la semana y botones Anterior/Siguiente en Vida y Ministerio: **3,3:1**.
- Conferencias: horario `.conf-time` **2,2:1**. Lectores: número del día y etiqueta "Evento" **2,2:1**.
- Limpieza: rango de la semana `.week-range` **≈1,2:1** y nota `.week-note` 3,3:1 (se medirá a mano: puede haber un fondo de color que la medición automática no ve).
- Títulos de sección del inicio ("Secciones"): 3,6:1. Flechas "→" de las tarjetas: 3,3:1.
- Bloques de Vida y Ministerio: el amarillo `#c4890a` sobre su fondo claro da ≈2,9:1.

### 3. Áreas táctiles de menos de 48×48 px
- Botones Menú y Tema en todas las páginas: 42×42.
- Salidas: chips de territorio "T-16" de **≈58×24**, botón "Mapa" de 87×32 y "Ver ubicación" de ≈24 px de alto.
- Vida y Ministerio: botón cerrar ✕ del programa: 36×36.
- Grupos: "Integrantes (n)": 42 px de alto.
- Territorios: ✕ de 34×34 y 36×36, ✦ de 38×38, ítems de lista de 42 px.
- Conferencias (carpeta): "Volver" 40×40, 🌙 39×37.

### 4. Bloques apretados en celular
- No hay scroll horizontal en ninguna página.
- Vida y Ministerio: el programa abre en una ventana flotante (88 % del alto) con su propio scroll interior. Los nombres van en mayúsculas grises chicas, en la misma línea que la duración. A 360 px, los nombres dobles ("Martina Huamacondor / Fanny Villantoy") se parten en dos renglones apretados.
- Salidas: la columna del día (52 px) más la tarjeta dejan poco ancho para lugares largos.
- Territorios: la leyenda del mapa (11 a 12 px) tapa parte del mapa en celular.

### 5. Scroll excesivo
- **Salidas: 5.893 px de alto (≈8 pantallas)**. Muestra el mes entero, días pasados incluidos. Nada se pliega, no hay índice y **no tiene botón "volver arriba"** (no encontré ninguno en el código). Al cargar, salta solo hasta "hoy" con una animación.
- Conferencias (carpeta) 4.547 px, Limpieza 3.197 px, Conferencias 2.755 px: listas completas sin agrupar.

### 6. Íconos sin texto
- Botones del encabezado: menú (dos rayitas) y luna/sol. Solo tienen `aria-label`, ningún texto visible.
- Inicio: flechas "→" en cada tarjeta. La campana de notificaciones flotante muestra un "!" rojo sin explicación.
- Territorios: botones ✦, ✕, 📌, ☰.
- Salidas: el chip de territorio muestra solo "T-23", sin decir "Territorio".

### 7. Inconsistencias de estilo
- Tres sistemas distintos: las páginas principales (Syne + DM Sans, crema/verde), `territorios/` (oscuro, fuente Outfit, otros colores) y `conferencias/index.html` (Tailwind puro, otra estética).
- El color de cada sección cambia en el inicio (#6366f1, #0ea5e9, #10b981, #8b5cf6), sin un significado claro.
- Bordes distintos para lo mismo: 8, 10, 12, 14, 18, 20, 22, 24 y 26 px.
- Banners en línea con otra fuente: el de la campaña en Salidas usa Inter, cursiva y azul fijo.
- El carrusel del inicio cambia solo cada 3,5 s y no se puede pausar.
- Muchas etiquetas en MAYÚSCULAS con letras separadas.

## Fase 2: qué se hizo en la vista previa
Archivo: `Tablero-Norte-Garin/vista-previa/index.html`. Es autocontenido y lleva `noindex` y el cartel "VISTA PREVIA — NO OFICIAL". Lee los `*-data.js` reales solo para mostrarlos. Si no los encuentra, usa datos de ejemplo. No tiene ningún botón que guarde o borre datos.
Ver la respuesta en el chat para la lista de cambios y las decisiones pendientes.
