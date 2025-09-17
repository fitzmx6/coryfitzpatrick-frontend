// TypeScript version for registering the SW

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 IPv4 localhost
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export default function register() {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

        window.addEventListener('load', () => {
            if (isLocalhost) {
                // Check if SW exists for localhost
                checkValidServiceWorker(swUrl);
                navigator.serviceWorker.ready.then(() => {
                    console.log('[SW] App served cache-first by service worker.');
                });
            } else {
                // Production: register SW normally
                registerValidSW(swUrl);
            }
        });
    }
}

function registerValidSW(swUrl) {
    navigator.serviceWorker.register(swUrl)
        .then(registration => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (!installingWorker) return;

                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            console.log('[SW] New content available; please refresh.');
                        } else {
                            console.log('[SW] Content cached for offline use.');
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.error('[SW] Registration failed:', error);
        });
}

function checkValidServiceWorker(swUrl) {
    fetch(swUrl)
        .then(response => {
            const contentType = response.headers.get('content-type');
            if (response.status === 404 || (contentType && contentType.indexOf('javascript') === -1)) {
                // SW missing or not JS: unregister
                navigator.serviceWorker.ready.then(registration => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                registerValidSW(swUrl);
            }
        })
        .catch(() => {
            console.log('[SW] No internet connection. App running in offline mode.');
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}
