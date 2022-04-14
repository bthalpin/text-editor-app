const installBtn = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
    installBtn.classList.remove('hidden')
    // installBtn.setAttribute('visibility', 'visible');



// TODO: Implement a click event handler on the `butInstall` element
installBtn.addEventListener('click', async () => {
    const beforeInstall = window.deferredPrompt;
    console.log('click',beforeInstall,window.deferredPrompt)
    if (!beforeInstall){
        return
    }
    beforeInstall.prompt();

    window.deferredPrompt = null;
    // installBtn.setAttribute('visibility', 'hidden');
    // installBtn.textContent = 'Installed!';
    installBtn.classList.add('hidden');
});
});
// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
