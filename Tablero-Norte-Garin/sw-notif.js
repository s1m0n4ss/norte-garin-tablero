// sw-notif.js – Service Worker para notificaciones periódicas
// Norte Garín Tablero Digital

const CACHE_NAME = 'ng-notif-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Manejar clics en notificaciones del sistema
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './index.html';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
      const match = cs.find(c => c.url.includes('norte') || c.url.includes('tablero'));
      if (match) return match.focus();
      return clients.openWindow(url);
    })
  );
});

// Sincronización periódica en segundo plano (Chrome Android)
self.addEventListener('periodicsync', e => {
  if (e.tag === 'check-assignments') {
    e.waitUntil(checkAndNotify());
  }
});

async function checkAndNotify() {
  // Leer datos desde caché o IndexedDB no es trivial en el SW sin datos.
  // El sistema principal (notificaciones.js) maneja la lógica completa.
  // Este SW solo gestiona el clic y las notificaciones del sistema.
  // Si en el futuro se desea push real, aquí se procesaría el push event.
  return Promise.resolve();
}

// Manejar mensajes desde la página principal
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SHOW_NOTIFICATION') {
    const { titulo, cuerpo } = e.data;
    self.registration.showNotification(titulo, {
      body: cuerpo,
      icon: 'img/icon-192.png',
      badge: 'img/icon-192.png',
      tag: 'asignacion-semana',
      renotify: false,
      data: { url: 'index.html' }
    });
  }
});
