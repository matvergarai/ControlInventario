import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
    }, 1200); // Simula un retraso de 2 segundos
  }
}
