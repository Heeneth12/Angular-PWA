import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  deferredPrompt: any;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    // Stash the event so it can be triggered later
    this.deferredPrompt = event;
    // Show your custom install promotion
    this.showInstallPromotion();
  }

  showInstallPromotion() {
    // Implement your code to show a pop-up or banner to promote the installation
    const installBanner = document.getElementById('installBanner');
    if (installBanner) {
      installBanner.style.display = 'block';
    }
  }

  promptInstall() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        this.deferredPrompt = null;
      });
    }
  }
}
