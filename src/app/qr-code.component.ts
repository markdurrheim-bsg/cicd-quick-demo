import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  template: `
    <a
      [href]="url"
      target="_blank"
      rel="noopener noreferrer"
      class="qr-link"
      aria-label="Open {{ url }}"
    >
      <div class="qr-code-frame">
        <canvas #canvasRef aria-hidden="true"></canvas>
      </div>
    </a>
  `,
  styles: [
    `
      .qr-link {
        display: inline-block;
        text-decoration: none;
        cursor: pointer;
      }

      .qr-code-frame {
        display: inline-flex;
        padding: 1rem;
        background: white;
        border-radius: 1rem;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
      }

      canvas {
        width: 200px;
        height: 200px;
        display: block;
      }
    `,
  ],
})
export class QrCodeComponent implements AfterViewInit, OnChanges {
  @Input() url = '';
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.renderQRCode();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['url']?.firstChange) {
      this.renderQRCode();
    }
  }

  private renderQRCode() {
    if (!this.url || !this.canvasRef?.nativeElement) {
      return;
    }

    QRCode.toCanvas(this.canvasRef.nativeElement, this.url, {
      width: 220,
      margin: 2,
    }).catch((error) => {
      console.error('QR code generation error:', error);
    });
  }
}
