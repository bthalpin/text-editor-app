const installBtn = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    installBtn.classList.toggle('hidden',false)
});

// TODO: Implement a click event handler on the `butInstall` element
installBtn.addEventListener('click', async () => {
    const beforeInstall = window.deferredPrompt;
    if (!beforeInstall){
        return
    }
    beforeInstall.prompt();

    window.deferredPrompt = null;
    installBtn.classList.toggle('hidden',true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
