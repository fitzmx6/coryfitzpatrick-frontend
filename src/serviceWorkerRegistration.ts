// In production, register a service worker to serve assets from the local cache.
// This lets the app load faster on later visits and gives it offline capabilities.

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(): void {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // Use a fallback in case PUBLIC_URL is undefined
        const publicUrl = new URL(process.env.PUBLIC_URL || '/', window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL || ''}/service-worker.js`;

            if (isLocalhost) {
                // This is running on localhost. Check if a service worker still exists.
                checkValidServiceWorker(swUrl);

                navigator.serviceWorker.ready.then(() => {
                    console.log(
                        'This web app is being served cache-first by a service worker.'
                    );
                });
            } else {
                // Not localhost. Just register a service worker
                registerValidSW(swUrl);
            }
        });
    }
}

function registerValidSW(swUrl: string): void {
    navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (!installingWorker) return;

                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            console.log('New content is available; please refresh.');
                        } else {
                            console.log('Content is cached for offline use.');
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.error('Error during service worker registration:', error);
        });
}

function checkValidServiceWorker(swUrl: string): void {
    fetch(swUrl)
        .then(response => {
            // Ensure a service worker exists and is JS
            const contentType = response.headers.get('content-type');
            if (
                response.status === 404 ||
                (contentType && contentType.indexOf('javascript') === -1)
            ) {
                // No service worker found. Reload the page.
                navigator.serviceWorker.ready.then(registration => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // Service worker found. Proceed as normal.
                registerValidSW(swUrl);
            }
        })
        .catch(() => {
            console.log('No internet connection found. App is running in offline mode.');
        });
}

export function unregister(): void {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}
