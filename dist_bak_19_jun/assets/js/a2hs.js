var deferredPrompt;
var btnSave = document.querySelectorAll('.addToHome')[0];

    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();   //I even try with this uncommented no luck so far

      // Stash the event so it can be triggered later.
      deferredPrompt = e;

      return false;
    });
    function ready() {
        if (window.matchMedia('(display-mode: standalone)').matches) {
console.log("This is running as standalone.");
var btnSave = document.getElementById('addToHome');
btnSave.style.display = 'none';
}
    }
  
    document.addEventListener("DOMContentLoaded", ready);

    btnSave.addEventListener('click', function() {
      if(deferredPrompt !== undefined) {
        // The user has had a postive interaction with our app and Chrome
        // has tried to prompt previously, so let's show the prompt.
        deferredPrompt.prompt();
        document.dispatchEvent(deferredPrompt);
        btnSave.style.display = 'none';
        // Follow what the user has done with the prompt.
        deferredPrompt.userChoice.then(function(choiceResult) {

          console.log(choiceResult.outcome);

          if(choiceResult.outcome == 'dismissed') {
            console.log('User cancelled home screen install');
          }
          else {
            console.log('User added to home screen');
          }

          // We no longer need the prompt.  Clear it up.
       //   deferredPrompt = null;
        });
      }
    });

    window.addEventListener('appinstalled', (evt) => {
      app.logEvent('a2hs', 'installed');
      console.log("dfadf    ");
    });