const installBtn = document.getElementById('buttonInstall');

// Logic for installing the PWA

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();

    // defers the install prompt to be used with button click
    window.deferredPrompt = e;

    // displays button if hidden
    installBtn.classList.remove('hidden')
    

});

// Sets install prompt to click event on button
installBtn.addEventListener('click', async () => {
    const installPrompt = window.deferredPrompt;
    
    // returns out of function if no install prompt
    if (!installPrompt){
        return
    }
    
    // runs install prompt
    installPrompt.prompt();

    // Removes install prompt from deferred prompt and hides button
    window.deferredPrompt = null;
    installBtn.classList.add('hidden');
});

// Hides button if app is installed
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
    installBtn.classList.add('hidden');

});
