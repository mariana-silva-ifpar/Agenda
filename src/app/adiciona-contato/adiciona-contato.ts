import { Component } from '@angular/core';
import { Tipo } from './classes/tipo';

@Component({
  selector: 'app-adiciona-contato',
  imports: [],
  templateUrl: './adiciona-contato.html',
  styleUrl: './adiciona-contato.css'
})
export class AdicionaContato {
  public tipos = Object.values(Tipo);

}
