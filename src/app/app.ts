import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QrCodeComponent } from './qr-code.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QrCodeComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('demo-cicd-basics');
}
