# Tablero Digital Norte Garín: reglas del proyecto

Sitio estático publicado en Netlify (https://norte-garin.netlify.app) desde la carpeta `Tablero-Norte-Garin/`.
Lo usan personas mayores y de todas las edades, sobre todo desde el celular.

## Reglas críticas
1. **`main` se publica en producción.** Cualquier cambio de diseño o de código se prueba primero en una rama y se muestra antes de unir a `main`.
2. **Los datos viven en archivos `*-data.js`** (`salidas-data.js`, `vida-ministerio-data.js`, `conferencias-data.js`, etc.). Cargar programas nuevos = editar solo esos archivos. No hay base de datos ni Firebase.
3. **No cambiar la lógica sin pedido explícito.** Cambios visuales y cambios de funcionamiento van por separado.
4. Territorios (`territorios/index.html`) guarda los "no visitados" solo en el `localStorage` de cada celular.

## Reglas de diseño (obligatorias)
Todo lo visual compartido está en **`Tablero-Norte-Garin/estilos.css`**, que cada página carga después de su propio `<style>`.
El panel de **Configuración** (botón de engranaje arriba a la derecha: tamaño de letra y modo claro/oscuro) y el botón "Volver arriba" están en **`accesibilidad.js`**.

### Tamaños
- La base es **18px** (`html { font-size: calc(112.5% * var(--scale)) }`). Escribir los tamaños en **rem**, nunca en px, para que el ajuste de letra los cambie.
- **Con la letra "Normal" (la que viene por defecto) ningún texto mide menos de 16px.** El mínimo permitido en CSS es `0.95rem`.
- Niveles de letra: Muy chica (0.85), Chica (0.94), Normal (1), Grande (1.15), Muy grande (1.3), Enorme (1.5). "Muy chica" baja de 16px a pedido de la congregación, y solo se usa si cada persona la elige.
- Títulos claramente más grandes y en negrita. Interlineado de 1.5 a 1.6.
- Nada de bloques largos en MAYÚSCULAS. En etiquetas cortas en mayúsculas, `letter-spacing` de 0.03em como máximo. Nada de cursivas finas.
- Fechas completas: "Sábado 14 de noviembre" y "9:30 hs", no "14/11 9:30".
- Nombres de personas en formato "Lucas Segovia", no "LUCAS SEGOVIA" (se convierte al mostrar; los datos pueden seguir en mayúsculas).

### Colores: paleta B "Verde bosque"
Definida una sola vez en `estilos.css` (bloques `:root` y `html.dark`). Para cambiarla, tocar solo ahí.

| Token | Claro | Oscuro |
|---|---|---|
| `--bg` (fondo crema) | `#f6f0e4` | `#111a15` |
| `--bg-card` | `#fffdf8` | `#1a261f` |
| `--bg-card2` (beige) | `#ede3cf` | `#24342b` |
| `--text` | `#1b211c` | `#f5f0e5` |
| `--text-muted` | `#46463c` | `#d6cfbd` |
| `--accent` (verde esmeralda oscuro) | `#0f4c3a` | `#86d6b3` |
| `--on-accent` (texto sobre `--accent`) | `#ffffff` | `#0e1a14` |
| `--accent-warm` (tierra) | `#8a4b22` | `#e6ad84` |

- Contraste: **WCAG AA como mínimo (4.5:1)**; el texto principal llega a **AAA (7:1)**.
- Sobre un fondo `var(--accent)`, el texto va siempre en `var(--on-accent)`, nunca en `#fff` fijo (en modo oscuro el acento es claro).
- No usar `opacity` para "apagar" texto: baja el contraste. Lo pasado se marca con borde punteado y texto.
- La información nunca depende solo del color: siempre lleva también texto o forma.
- No hay modo de alto contraste (se descartó). Sí hay modo claro/oscuro, en el panel de Configuración.
- Fuente única: **Inter**.

### Estilo (aspecto fino y despejado)
- **Pocos bordes.** Las tarjetas van sin borde, con la sombra suave `--shadow-card`. Para separar se usan líneas finas (`--hairline`, 1px). Un borde de 2px verde se reserva para lo seleccionado (semana abierta, día elegido).
- **Botones:** el principal va relleno de `--accent`; los secundarios con fondo beige (`--bg-card2`), texto verde y sin contorno.
- **Pesos de letra:** títulos 700, lugar y hora 600, nombres 500, el resto 400. No usar 800.
- **Espacios y esquinas** siempre con los tokens: `--s-1` (0.5rem), `--s-2` (1rem), `--s-3` (1.5rem, entre secciones), `--r-card` (12px), `--r-btn` (10px).
- La tarjeta de HOY es clara, con una franja verde de 4px a la izquierda, etiquetas chicas "HOY" / "PRÓXIMA SALIDA" y la hora grande en verde.
- Horarios escritos "10:00 hs".

### Íconos
- Pocos y serios. Nada de emojis decorativos. Un ícono va acompañado de su texto, salvo que sea puramente decorativo (`aria-hidden="true"`).
- Excepciones que se mantienen: el ícono de cámara del botón de Zoom, los íconos de sección de Vida y Ministerio y el engranaje de Configuración (solo ícono, con `aria-label`).

### Vida y Ministerio
Sigue el formato de la guía oficial (wol.jw.org):
- Fecha "2-8 DE NOVIEMBRE" en gris y lectura bíblica en negrita.
- "Canción X y oración | Palabras de introducción (1 min.)".
- Tres secciones con su color e ícono: TESOROS DE LA BIBLIA (`#2a6b77`, diamante), SEAMOS MEJORES MAESTROS (`#84590d`, espiga de trigo) y NUESTRA VIDA CRISTIANA (`#942926`, oveja).
- Partes numeradas en el color de su sección, con "(10 mins.)" debajo y el asignado.
- Cierre "Palabras de conclusión (3 mins.) | Canción X y oración".

### Tocar y navegar
- Botones y enlaces de **48×48px como mínimo**. El botón "Volver arriba" mide 56px.
- Encabezado fijo y simple en todas las páginas: **Menú · Norte Garín · engranaje de Configuración**. No poner más botones ni pestañas ahí: la pantalla tiene que verse despejada.
- Foco visible al navegar con teclado (`:focus-visible`). Respetar `prefers-reduced-motion`.
- Todo debe verse bien a **360px de ancho sin scroll horizontal**. En celular, las grillas de dos columnas pasan a una.
- Salidas: arriba va HOY y la PRÓXIMA SALIDA. Por defecto se ve por pestañas de días, con un selector "Ver por: Días / Semanas" (semanas plegables). Sin botones extra de salto.

## Cómo revisar un cambio
Servir la carpeta (`python3 -m http.server` dentro de `Tablero-Norte-Garin/`) y abrir cada página a 360px de ancho, en modo claro y oscuro. Comprobar:
- que no quede texto de menos de 16px ni botones chicos;
- que no haya scroll horizontal;
- que no haya errores en la consola;
- que sigan todos los enlaces y datos.
