import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CONTROL-inventarios-MaestranzasUnidosSA';
  loading = false;

  constructor(private spinner: NgxSpinnerService){}
  
  openSpinner(){
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },5000)
  }
}


