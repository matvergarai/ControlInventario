import { Component, OnInit } from '@angular/core';
import { UsuarioDto } from '../../model/usuariodto';
@Component({
  selector: 'app-userprofile',
  standalone: false,
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent implements OnInit {
  user: UsuarioDto = {
    id: 1,
    username: 'Usertest',
    password: 'password',
    description: 'Usuario de prueba'
  };

  ngOnInit():void{

  }
}
