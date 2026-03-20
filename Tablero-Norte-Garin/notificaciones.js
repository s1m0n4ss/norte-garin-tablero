// notificaciones.js
// Sistema de notificaciones de asignaciones para el Tablero Digital Norte Garín.
// Muestra avisos al hermano cuando abre el sitio durante la semana en que tiene
// una asignación (presidente de VyM, partes, lector, presidente del domingo, limpieza).

(function () {
  'use strict';

  // ── UTILIDADES ─────────────────────────────────────────────────────────────

  function normalizar(str) {
    if (!str) return '';
    return str.toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  // Verifica si el nombre del usuario coincide con un nombre asignado.
  // Permite variantes como "DARIO CORTEZ" == "DARIO CORTES" (un carácter de diferencia)
  // o "MARIO SEGOVIA" en "MARIO SEGOVIA / OTRO NOMBRE".
  function coincideNombre(usuario, asignado) {
    if (!usuario || !asignado) return false;
    const u = normalizar(usuario);
    // El campo asignado puede contener múltiples hermanos separados por " / "
    const partes = asignado.split('/').map(s => normalizar(s.trim()));
    return partes.some(p => {
      if (p === u) return true;
      // Coincidencia por palabras: todas las palabras del usuario aparecen en el asignado
      // Usa matching exacto por token (no substring) para evitar falsos positivos
      const palabrasU = u.split(/\s+/).filter(w => w.length > 2);
      const palabrasP = p.split(/\s+/);
      if (palabrasU.length >= 1 && palabrasU.every(w => palabrasP.includes(w))) return true;
      return false;
    });
  }

  // Lunes de la semana de una fecha dada
  function lunesDe(fecha) {
    const d = new Date(fecha);
    d.setHours(0, 0, 0, 0);
    const dow = d.getDay(); // 0=Dom, 1=Lun
    const diff = dow === 0 ? -6 : 1 - dow;
    d.setDate(d.getDate() + diff);
    return d;
  }

  // Devuelve el domingo de la semana dada (lunes como base)
  function domingoDe(lunes) {
    const d = new Date(lunes);
    d.setDate(d.getDate() + 6);
    return d;
  }

  // Formatea fecha como "YYYY-MM-DD"
  function fmtFecha(d) {
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  // Calcula qué grupos tienen limpieza la semana que contiene el lunes dado
  function grupoLimpieza(lunes) {
    const data = window.NOTIF_DATA && window.NOTIF_DATA.limpieza;
    if (!data) return null;
    const msWeek = 7 * 24 * 60 * 60 * 1000;
    const ref = new Date(data.inicioReferencia);
    ref.setHours(0, 0, 0, 0);
    const diff = Math.round((lunes - ref) / msWeek);
    if (diff < 0) return null;
    return data.secuencia[diff % data.secuencia.length];
  }

  // Determina a cuál grupo pertenece el usuario buscando en GRUPOS_DATA
  function grupoDelUsuario(usuario) {
    if (!window.GRUPOS_DATA) return null;
    const u = normalizar(usuario);
    for (const g of window.GRUPOS_DATA) {
      for (const integrante of g.integrantes) {
        // integrantes en formato "Apellido Nombre" → comparar tokens
        const tokens = normalizar(integrante).split(/\s+/);
        const palabrasU = u.split(/\s+/).filter(w => w.length > 2);
        if (palabrasU.length >= 1 && palabrasU.every(w => tokens.includes(w))) {
          return g.id; // 1, 2, 3 ó 4
        }
      }
      // También revisar superintendente y auxiliar
      const roles = [g.superintendente, g.auxiliar];
      for (const r of roles) {
        if (!r) continue;
        const tokens = normalizar(r).split(/\s+/);
        const palabrasU = u.split(/\s+/).filter(w => w.length > 2);
        if (palabrasU.length >= 1 && palabrasU.every(w => tokens.includes(w))) {
          return g.id;
        }
      }
    }
    return null;
  }

  // ── VERIFICACIÓN DE ASIGNACIONES ───────────────────────────────────────────

  function verificarAsignacionesSemana(usuario) {
    if (!window.NOTIF_DATA) return [];
    const data = window.NOTIF_DATA;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const lunes = lunesDe(hoy);
    const domingo = domingoDe(lunes);
    const lunes2 = new Date(lunes); lunes2.setDate(lunes.getDate() + 7); // próxima semana

    const asignaciones = [];

    // 1. Vida y Ministerio (reunión del jueves de esta semana)
    for (const sem of data.vidaMinisterio) {
      const keyDate = new Date(sem.key + 'T00:00:00');
      // La reunión es el jueves de esa semana (key + 3 días)
      if (keyDate.getTime() === lunes.getTime()) {
        if (coincideNombre(usuario, sem.presidente)) {
          asignaciones.push({
            tipo: 'vym-presidente',
            rol: 'Presidente de Vida y Ministerio',
            detalle: 'Semana ' + sem.titulo,
            icono: '📖',
            color: '#2d9e6b'
          });
        }
        for (const parte of sem.partes) {
          if (coincideNombre(usuario, parte)) {
            asignaciones.push({
              tipo: 'vym-parte',
              rol: 'Parte en Vida y Ministerio',
              detalle: 'Semana ' + sem.titulo,
              icono: '✋',
              color: '#c4890a'
            });
            break; // una sola notificación aunque tenga varias partes
          }
        }
        break;
      }
    }

    // 2. Lectores – verificar si hay lectura esta semana (dom o jue)
    for (const lec of data.lectores) {
      const fechaLec = new Date(lec.fecha + 'T00:00:00');
      if (fechaLec >= lunes && fechaLec <= domingo) {
        if (coincideNombre(usuario, lec.nombre)) {
          const esAtalaya = lec.tipo === 'atalaya';
          asignaciones.push({
            tipo: 'lector',
            rol: 'Lector – ' + (esAtalaya ? 'La Atalaya (Domingo)' : 'Est. Bíblico (Jueves)'),
            detalle: 'El ' + (esAtalaya ? 'domingo' : 'jueves') + ' ' +
              fechaLec.toLocaleDateString('es-AR', { day: 'numeric', month: 'long' }),
            icono: '📰',
            color: '#2563eb'
          });
        }
      }
    }

    // 3. Presidente del Discurso Dominical (domingo de esta semana)
    const fechaDomingo = fmtFecha(domingo);
    for (const conf of data.conferencias) {
      if (conf.fecha === fechaDomingo) {
        if (coincideNombre(usuario, conf.chairman)) {
          asignaciones.push({
            tipo: 'presidente-domingo',
            rol: 'Presidente de la Reunión del Domingo',
            detalle: 'Domingo ' + domingo.toLocaleDateString('es-AR', { day: 'numeric', month: 'long' }),
            icono: '🎙️',
            color: '#7c3aed'
          });
        }
        // Si el hermano es orador local este domingo
        if (conf.esLocal && coincideNombre(usuario, conf.speaker)) {
          asignaciones.push({
            tipo: 'orador',
            rol: 'Discursante del Domingo',
            detalle: 'Domingo ' + domingo.toLocaleDateString('es-AR', { day: 'numeric', month: 'long' }),
            icono: '🗣️',
            color: '#7c3aed'
          });
        }
        break;
      }
    }

    // 4. Multimedia (Audio/Video, Microfonistas, Plataforma, Acomodadores)
    if (data.multimedia) {
      const rolesMultimedia = [
        { key: 'audio_video',   rol: 'Audio y Video',        icono: '🎧', color: '#0ea5e9' },
        { key: 'microfonistas', rol: 'Microfonistas',         icono: '🎤', color: '#0ea5e9' },
        { key: 'plataforma',    rol: 'Plataforma',            icono: '📺', color: '#0ea5e9' },
        { key: 'entrada',       rol: 'Acomodador – Entrada',  icono: '🚪', color: '#64748b' },
        { key: 'auditorio',     rol: 'Acomodador – Auditorio',icono: '🏛️', color: '#64748b' },
      ];
      for (const sem of data.multimedia) {
        const ini = new Date(sem.inicio + 'T00:00:00');
        const fin = new Date(sem.fin + 'T23:59:59');
        if (hoy >= ini && hoy <= fin) {
          for (const r of rolesMultimedia) {
            if (sem[r.key] && coincideNombre(usuario, sem[r.key])) {
              asignaciones.push({
                tipo: 'multimedia-' + r.key,
                rol: r.rol,
                detalle: 'Semana ' + sem.label,
                icono: r.icono,
                color: r.color
              });
            }
          }
          break;
        }
      }
    }

    // 5. Limpieza del Salón
    const grupoHoy = grupoLimpieza(lunes);
    if (grupoHoy) {
      const grupoId = grupoDelUsuario(usuario);
      let grupo12 = grupoHoy.includes('1'); // "Grupos 1 y 2" → grupos 1 y 2
      let usuarioEnGrupo12 = grupoId === 1 || grupoId === 2;
      let usuarioEnGrupo34 = grupoId === 3 || grupoId === 4;
      const leCorresponde = (grupo12 && usuarioEnGrupo12) || (!grupo12 && usuarioEnGrupo34);
      if (leCorresponde) {
        asignaciones.push({
          tipo: 'limpieza',
          rol: 'Limpieza del Salón',
          detalle: grupoHoy + ' – esta semana',
          icono: '🧹',
          color: '#b45309'
        });
      }
    }

    return asignaciones;
  }

  // ── NOTIFICACIONES DEL NAVEGADOR ───────────────────────────────────────────

  async function pedirPermiso() {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;
    const result = await Notification.requestPermission();
    return result === 'granted';
  }

  function mostrarBrowserNotification(asignaciones, usuario) {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    // Mostrar una sola notificación resumen
    const cantidad = asignaciones.length;
    const titulo = 'Norte Garín – Asignaciones';
    const cuerpo = cantidad === 1
      ? `${usuario.split(' ')[0]}, tenés: ${asignaciones[0].rol}.`
      : `${usuario.split(' ')[0]}, tenés ${cantidad} asignaciones esta semana.`;

    navigator.serviceWorker && navigator.serviceWorker.ready.then(reg => {
      reg.showNotification(titulo, {
        body: cuerpo,
        icon: 'img/icon-192.png',
        badge: 'img/icon-192.png',
        tag: 'asignacion-semana',
        renotify: false,
        data: { url: 'index.html' }
      });
    }).catch(() => {
      new Notification(titulo, { body: cuerpo });
    });
  }

  // ── REGISTRO DEL SERVICE WORKER ────────────────────────────────────────────

  function registrarServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('sw-notif.js').then(reg => {
      // Intentar registrar sync periódico (Chrome Android)
      if ('periodicSync' in reg) {
        reg.periodicSync.register('check-assignments', {
          minInterval: 24 * 60 * 60 * 1000 // cada 24 h
        }).catch(() => {});
      }
    }).catch(() => {});
  }

  // ── BANNER EN PANTALLA ─────────────────────────────────────────────────────

  function mostrarBanner(asignaciones, usuario) {
    let contenedor = document.getElementById('notif-banner-container');
    if (!contenedor) {
      // Crear el contenedor antes de la primera <main> o al inicio del body
      contenedor = document.createElement('div');
      contenedor.id = 'notif-banner-container';
      const mainEl = document.querySelector('main');
      if (mainEl) {
        mainEl.parentNode.insertBefore(contenedor, mainEl);
      } else {
        document.body.insertBefore(contenedor, document.body.firstChild);
      }
    }

    const primerNombre = usuario.split(' ').map(w => w[0] + w.slice(1).toLowerCase()).join(' ');
    const hoy = new Date();
    const diasSemana = ['dom','lun','mar','mié','jue','vie','sáb'];
    const diasLabel = hoy.getDay() >= 5
      ? 'este fin de semana'
      : 'esta semana';

    const items = asignaciones.map(a => `
      <div class="notif-item" style="border-left:3px solid ${a.color}">
        <span class="notif-item-icon">${a.icono}</span>
        <div class="notif-item-body">
          <div class="notif-item-rol">${a.rol}</div>
          <div class="notif-item-detalle">${a.detalle}</div>
        </div>
      </div>`).join('');

    contenedor.innerHTML = `
      <div class="notif-banner" id="notif-banner">
        <div class="notif-banner-header">
          <div class="notif-banner-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            Tus asignaciones ${diasLabel}
          </div>
          <button class="notif-banner-close" id="notif-close" aria-label="Cerrar">✕</button>
        </div>
        ${items}
      </div>`;

    document.getElementById('notif-close').onclick = () => {
      const banner = document.getElementById('notif-banner');
      if (banner) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(-8px)';
        setTimeout(() => { contenedor.innerHTML = ''; }, 300);
      }
      // Recordar que fue cerrado hoy
      localStorage.setItem('notif-dismissed', new Date().toDateString());
    };
  }

  // ── MODAL DE CONFIGURACIÓN ────────────────────────────────────────────────

  // Convierte "Apellido Nombre" → "Nombre Apellido" (formato de grupos-data.js)
  function invertirNombre(apellidoNombre) {
    const partes = apellidoNombre.trim().split(/\s+/);
    if (partes.length < 2) return apellidoNombre;
    // "Becerra Nely" → "Nely Becerra" | "Segovia León" → "León Segovia"
    // "Sánchez Juan Carlos" → "Juan Carlos Sánchez"
    return partes.slice(1).join(' ') + ' ' + partes[0];
  }

  // Genera el HTML de <optgroup> por grupo para el selector de hermanos
  function buildOpcionesGrupos(usuarioActual) {
    if (!window.GRUPOS_DATA) return '<option value="">— Sin datos de grupos —</option>';
    const ua = normalizar(usuarioActual);

    let html = '<option value="">— Seleccionar hermano/a —</option>';
    for (const grupo of window.GRUPOS_DATA) {
      html += `<optgroup label="${grupo.nombre} — ${grupo.superintendente.split(' ').reverse().join(' ')}">`;

      // Reunir todos los miembros del grupo (superintendente, auxiliar, integrantes)
      const miembros = new Map(); // valor → etiqueta display

      // integrantes en "Apellido Nombre" → invertir
      for (const integrante of grupo.integrantes) {
        const nombreNorm = normalizar(invertirNombre(integrante));
        const display = invertirNombre(integrante).split(' ')
          .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        miembros.set(nombreNorm, display);
      }

      // Superintendente en "Apellido Nombre" → invertir
      if (grupo.superintendente) {
        const nombreNorm = normalizar(invertirNombre(grupo.superintendente));
        const display = invertirNombre(grupo.superintendente).split(' ')
          .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        miembros.set(nombreNorm, display);
      }

      // Auxiliar (puede estar en "Apellido Nombre" o "Nombre Apellido" → normalizar de igual forma)
      if (grupo.auxiliar) {
        const nombreNorm = normalizar(invertirNombre(grupo.auxiliar));
        const display = invertirNombre(grupo.auxiliar).split(' ')
          .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(' ');
        miembros.set(nombreNorm, display);
      }

      // Ordenar alfabéticamente por display
      const sorted = [...miembros.entries()].sort((a, b) =>
        a[1].localeCompare(b[1], 'es'));

      for (const [value, display] of sorted) {
        html += `<option value="${value}" ${value === ua ? 'selected' : ''}>${display}</option>`;
      }

      html += '</optgroup>';
    }
    return html;
  }

  function abrirModalConfig() {
    const usuario = localStorage.getItem('notif-usuario') || '';
    const notifHabilitadas = localStorage.getItem('notif-enabled') !== 'false';
    const permiso = ('Notification' in window) ? Notification.permission : 'unsupported';

    // Construir lista de hermanos desde GRUPOS_DATA
    const opciones = buildOpcionesGrupos(usuario);

    const modal = document.createElement('div');
    modal.id = 'notif-modal';
    modal.innerHTML = `
      <div class="notif-modal-overlay" id="notif-modal-overlay"></div>
      <div class="notif-modal-sheet">
        <div class="notif-modal-handle"></div>
        <div class="notif-modal-header">
          <div class="notif-modal-title">Mis Notificaciones</div>
          <button class="notif-modal-close-btn" id="notif-modal-close">✕</button>
        </div>

        <div class="notif-modal-body">
          <div class="notif-form-group">
            <label class="notif-form-label">¿Quién sos?</label>
            <p class="notif-form-hint">Seleccioná tu nombre para recibir recordatorios de tus asignaciones.</p>
            <select id="notif-select-nombre" class="notif-form-select">
              <option value="">— Seleccionar hermano/a —</option>
              ${opciones}
            </select>
          </div>

          <div class="notif-form-group">
            <label class="notif-form-label">Notificaciones del navegador</label>
            <p class="notif-form-hint">Recibí avisos del navegador cuando abrís el tablero.</p>
            <button class="notif-perm-btn" id="notif-perm-btn">
              ${permiso === 'granted' ? '✅ Notificaciones activadas' :
                permiso === 'denied' ? '🚫 Bloqueadas por el navegador' :
                permiso === 'unsupported' ? '❌ No soportado' :
                '🔔 Activar notificaciones'}
            </button>
          </div>

          <button class="notif-save-btn" id="notif-save-btn">Guardar</button>

          <div id="notif-preview-area"></div>
        </div>
      </div>`;

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('visible'));

    // Eventos del modal
    document.getElementById('notif-modal-close').onclick = cerrarModal;
    document.getElementById('notif-modal-overlay').onclick = cerrarModal;

    document.getElementById('notif-perm-btn').onclick = async () => {
      const ok = await pedirPermiso();
      document.getElementById('notif-perm-btn').textContent =
        ok ? '✅ Notificaciones activadas' : '🚫 Bloqueadas por el navegador';
    };

    document.getElementById('notif-save-btn').onclick = () => {
      const nombre = document.getElementById('notif-select-nombre').value;
      if (!nombre) {
        document.getElementById('notif-select-nombre').style.borderColor = '#e74c3c';
        return;
      }
      localStorage.setItem('notif-usuario', nombre);
      localStorage.setItem('notif-enabled', 'true');
      localStorage.removeItem('notif-dismissed');

      // Mostrar preview de asignaciones
      const asig = verificarAsignacionesSemana(nombre);
      const preview = document.getElementById('notif-preview-area');
      if (asig.length > 0) {
        const primerNombre = nombre.split(' ').map(w => w[0] + w.slice(1).toLowerCase()).join(' ');
        preview.innerHTML = `
          <div class="notif-preview-title">Asignaciones esta semana:</div>
          ${asig.map(a => `
            <div class="notif-preview-item" style="border-color:${a.color}20;background:${a.color}10">
              <span>${a.icono}</span>
              <div>
                <div style="font-weight:600;font-size:13px">${a.rol}</div>
                <div style="color:var(--text-muted);font-size:11px">${a.detalle}</div>
              </div>
            </div>`).join('')}`;

        // Disparar notificación del navegador
        if (Notification.permission === 'granted') {
          mostrarBrowserNotification(asig, nombre);
        }
      } else {
        preview.innerHTML = `<div class="notif-preview-empty">✅ No tenés asignaciones esta semana.</div>`;
      }
    };
  }

  function cerrarModal() {
    const modal = document.getElementById('notif-modal');
    if (modal) {
      modal.classList.remove('visible');
      setTimeout(() => modal.remove(), 300);
    }
  }

  // ── BOTÓN FLOTANTE ─────────────────────────────────────────────────────────

  function inyectarBotonFlotante() {
    if (document.getElementById('notif-fab')) return;

    const fab = document.createElement('button');
    fab.id = 'notif-fab';
    fab.setAttribute('aria-label', 'Mis notificaciones');
    fab.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>`;
    fab.onclick = () => {
      if (!document.getElementById('notif-modal')) abrirModalConfig();
    };
    document.body.appendChild(fab);
  }

  // ── ESTILOS ────────────────────────────────────────────────────────────────

  function inyectarEstilos() {
    if (document.getElementById('notif-styles')) return;
    const style = document.createElement('style');
    style.id = 'notif-styles';
    style.textContent = `
      /* ── BANNER ── */
      #notif-banner-container { max-width:480px; margin:0 auto; position:relative; z-index:5; }
      .notif-banner {
        background:var(--bg-card,#fff);
        border:1px solid color-mix(in srgb,var(--accent,#2d6a4f) 30%,transparent);
        border-radius:18px; padding:14px 16px;
        margin-top:12px;
        box-shadow:0 4px 20px color-mix(in srgb,var(--accent,#2d6a4f) 10%,transparent);
        animation:notifSlideIn 0.35s ease both;
      }
      @keyframes notifSlideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:none} }
      .notif-banner { transition:opacity 0.25s,transform 0.25s; }
      .notif-banner-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
      .notif-banner-title {
        font-family:"Syne",sans-serif; font-size:11px; font-weight:700;
        letter-spacing:0.1em; text-transform:uppercase;
        color:var(--accent,#2d6a4f);
        display:flex; align-items:center; gap:6px;
      }
      .notif-banner-close {
        background:var(--bg-card2,#f0ede8); border:none; cursor:pointer;
        width:26px; height:26px; border-radius:8px; font-size:11px;
        color:var(--text-muted,#8a8075); display:flex; align-items:center; justify-content:center;
      }
      .notif-item {
        display:flex; align-items:flex-start; gap:10px;
        padding:8px 10px; border-radius:10px;
        background:var(--bg-card2,#f0ede8); margin-bottom:6px;
        padding-left:12px;
      }
      .notif-item:last-child { margin-bottom:0; }
      .notif-item-icon { font-size:16px; flex-shrink:0; margin-top:1px; }
      .notif-item-rol { font-size:13px; font-weight:600; line-height:1.3; }
      .notif-item-detalle { font-size:11px; color:var(--text-muted,#8a8075); margin-top:2px; }

      /* ── FAB ── */
      #notif-fab {
        position:fixed; bottom:max(28px,env(safe-area-inset-bottom,28px)); right:18px;
        width:52px; height:52px; border-radius:16px;
        background:var(--accent,#2d6a4f); color:#fff;
        border:none; cursor:pointer; z-index:150;
        display:flex; align-items:center; justify-content:center;
        box-shadow:0 6px 20px color-mix(in srgb,var(--accent,#2d6a4f) 35%,transparent);
        transition:transform 0.15s,box-shadow 0.15s;
      }
      #notif-fab:active { transform:scale(0.92); }
      #notif-fab .notif-badge {
        position:absolute; top:-5px; right:-5px;
        background:#e74c3c; color:#fff;
        font-size:10px; font-weight:700; font-family:"Syne",sans-serif;
        width:18px; height:18px; border-radius:50%;
        display:flex; align-items:center; justify-content:center;
        border:2px solid var(--bg,#f7f5f0);
      }

      /* ── MODAL ── */
      #notif-modal { position:fixed; inset:0; z-index:300; display:flex; align-items:flex-end; }
      #notif-modal.visible .notif-modal-sheet { transform:translateY(0); }
      #notif-modal.visible .notif-modal-overlay { opacity:1; }
      .notif-modal-overlay {
        position:absolute; inset:0; background:rgba(0,0,0,0.45);
        backdrop-filter:blur(4px); opacity:0; transition:opacity 0.3s;
      }
      .notif-modal-sheet {
        position:relative; z-index:1; width:100%; max-width:480px; margin:0 auto;
        background:var(--bg-card,#fff); border-radius:24px 24px 0 0;
        padding:12px 0 max(24px,env(safe-area-inset-bottom,24px));
        transform:translateY(100%); transition:transform 0.38s cubic-bezier(0.4,0,0.2,1);
        max-height:90vh; overflow-y:auto;
      }
      .notif-modal-handle {
        width:40px; height:4px; border-radius:4px; background:var(--border,rgba(26,23,20,0.12));
        margin:0 auto 16px;
      }
      .notif-modal-header {
        display:flex; align-items:center; justify-content:space-between;
        padding:0 20px 14px; border-bottom:1px solid var(--border,rgba(26,23,20,0.09));
      }
      .notif-modal-title { font-family:"Syne",sans-serif; font-size:17px; font-weight:700; }
      .notif-modal-close-btn {
        background:var(--bg-card2,#f0ede8); border:none; cursor:pointer;
        width:32px; height:32px; border-radius:10px; font-size:13px;
        color:var(--text-muted,#8a8075); display:flex; align-items:center; justify-content:center;
      }
      .notif-modal-body { padding:16px 20px; }
      .notif-form-group { margin-bottom:18px; }
      .notif-form-label {
        font-family:"Syne",sans-serif; font-size:11px; font-weight:700;
        text-transform:uppercase; letter-spacing:0.1em; color:var(--text-muted,#8a8075);
        display:block; margin-bottom:4px;
      }
      .notif-form-hint { font-size:12.5px; color:var(--text-muted,#8a8075); margin:0 0 8px; }
      .notif-form-select {
        width:100%; padding:12px 14px; border-radius:12px;
        border:1px solid var(--border,rgba(26,23,20,0.12));
        background:var(--bg-card2,#f0ede8); color:var(--text,#1a1714);
        font-family:"DM Sans",sans-serif; font-size:14px;
        appearance:none; -webkit-appearance:none;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238a8075' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
        background-repeat:no-repeat; background-position:right 14px center;
        padding-right:36px;
      }
      .notif-perm-btn {
        width:100%; padding:12px 16px; border-radius:12px;
        border:1px solid var(--border,rgba(26,23,20,0.12));
        background:var(--bg-card2,#f0ede8); color:var(--text,#1a1714);
        font-family:"DM Sans",sans-serif; font-size:14px; font-weight:500;
        cursor:pointer; text-align:left;
      }
      .notif-save-btn {
        width:100%; padding:15px; border-radius:14px; border:none;
        background:var(--accent,#2d6a4f); color:#fff;
        font-family:"Syne",sans-serif; font-size:14px; font-weight:700;
        cursor:pointer; margin-top:4px; margin-bottom:16px;
        transition:opacity 0.15s;
      }
      .notif-save-btn:active { opacity:0.85; }
      .notif-preview-title {
        font-family:"Syne",sans-serif; font-size:11px; font-weight:700;
        text-transform:uppercase; letter-spacing:0.1em; color:var(--text-muted,#8a8075);
        margin-bottom:8px;
      }
      .notif-preview-item {
        display:flex; align-items:flex-start; gap:10px;
        padding:10px 12px; border-radius:12px;
        border:1px solid transparent; margin-bottom:6px; font-size:13px;
      }
      .notif-preview-empty {
        text-align:center; color:var(--text-muted,#8a8075);
        font-size:13px; padding:12px 0;
      }
    `;
    document.head.appendChild(style);
  }

  // ── INICIALIZACIÓN ─────────────────────────────────────────────────────────

  function iniciar() {
    inyectarEstilos();
    inyectarBotonFlotante();
    registrarServiceWorker();

    const usuario = localStorage.getItem('notif-usuario');
    const habilitadas = localStorage.getItem('notif-enabled') !== 'false';
    const dismissedHoy = localStorage.getItem('notif-dismissed') === new Date().toDateString();

    if (!usuario) {
      // Primera visita: mostrar badge en FAB para invitar a configurar
      const fab = document.getElementById('notif-fab');
      if (fab) {
        const badge = document.createElement('div');
        badge.className = 'notif-badge';
        badge.textContent = '!';
        fab.appendChild(badge);
      }
      return;
    }

    if (!habilitadas || dismissedHoy) return;

    // Verificar asignaciones y mostrar banner + notificación
    const asignaciones = verificarAsignacionesSemana(usuario);
    if (asignaciones.length > 0) {
      mostrarBanner(asignaciones, usuario);

      // Badge en FAB
      const fab = document.getElementById('notif-fab');
      if (fab) {
        const badge = document.createElement('div');
        badge.className = 'notif-badge';
        badge.textContent = asignaciones.length;
        fab.appendChild(badge);
      }

      // Notificación del navegador (solo una vez al día)
      const lastNotif = localStorage.getItem('notif-last-browser');
      if (lastNotif !== new Date().toDateString()) {
        if (Notification.permission === 'granted') {
          mostrarBrowserNotification(asignaciones, usuario);
          localStorage.setItem('notif-last-browser', new Date().toDateString());
        }
      }
    }
  }

  // Esperar a que los datos estén disponibles
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }

  // Exponer globalmente para poder llamar desde otros scripts
  window.NOTIF = { abrir: abrirModalConfig };

})();
