import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cronometro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.scss']
})
export class CronometroComponent {
  inputMinutes = 0;
  countdown = 10;
  totalSeconds = 0;
  displayTime = '00:00';
  estado: 'inicial' | 'contagem' | 'rodando' | 'fim' = 'inicial';
  private interval: any;

  startCountdown() {
    if (!this.inputMinutes || this.inputMinutes <= 0) return;

    this.estado = 'contagem';
    this.countdown = 10;
    this.displayTime = this.countdown.toString();

    this.interval = setInterval(() => {
      this.countdown--;
      if (this.countdown >= 0) {
        this.displayTime = this.countdown.toString();
      } else {
        clearInterval(this.interval);
        this.startMainTimer();
      }
    }, 1000);
  }

 startMainTimer() {
  this.estado = 'rodando';
  this.totalSeconds = 0; // começa do zero

  this.interval = setInterval(() => {
    this.totalSeconds++;

    if (this.totalSeconds <= this.inputMinutes * 60) {
      this.updateDisplay();
    } else {
      clearInterval(this.interval);
      this.estado = 'fim';
    }
  }, 1000);
}


  limparSeZero() {
  if (this.inputMinutes === 0) {
    this.inputMinutes = null as any;
  }
}

padronizarValor() {
  if (this.inputMinutes == null || this.inputMinutes < 0) {
    this.inputMinutes = 0;
  }
}


  updateDisplay() {
    const m = Math.floor(this.totalSeconds / 60).toString().padStart(2, '0');
    const s = (this.totalSeconds % 60).toString().padStart(2, '0');
    this.displayTime = `${m}:${s}`;
  }

  voltar() {
    clearInterval(this.interval);
    this.estado = 'inicial';
    this.inputMinutes = 0;
    this.displayTime = '00:00';
  }

  fullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if ((el as any).webkitRequestFullscreen) (el as any).webkitRequestFullscreen();
    else if ((el as any).msRequestFullscreen) (el as any).msRequestFullscreen();
  }
}
