import { Component } from '@angular/core';
import { Tipo } from './classes/tipo';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contato } from './classes/contato';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { TelefonePipe } from '../telefone-pipe';

@Component({
  selector: 'app-adiciona-contato',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, TelefonePipe],
  providers: [provideNgxMask()],
  templateUrl: './adiciona-contato.html',
  styleUrl: './adiciona-contato.css'
})
export class AdicionaContato {
  public tipos = Object.values(Tipo);
  public form: FormGroup;
  contatos: Contato[] = [];

  constructor(
    private fb: FormBuilder,
  ){
    this.form = this.fb.group({
      nome: [null, Validators.required],
      telefone: [null, Validators.required],
      email: [null, Validators.required],
      aniversario: [null, Validators.required],
      tipo: [null, Validators.required],
    })
  }

  salvarContato(){
    if (this.form.valid){

    //verificação se o tipo ta selecionado
    if(this.form.get('tipo')?.value === 'null'){
      alert('Selecione um tipo.');
      return;
    }

    //verificação de telefone já registrado
    const telefone = this.form.get('telefone')?.value;
    const telefoneExistente = this.contatos.some(
      contato => contato.telefone === telefone
    );

    if (telefoneExistente) {
      alert('Já existe um contato com este telefone!');
      return;
    }

    //adição do contato na lista de contatos
      const contato = Contato.criarContato(this.form.value);
      this.contatos.push(contato);
      this.form.reset({})
    } else {
      alert('Todos os campos devem ser preenchidos.')
    }

  }

  excluirContato(telefone: string){
    if(confirm('Tem certeza que deseja excluir este contato?')){
      const index = this.contatos.findIndex(contato => contato.telefone === telefone);
      if(index !== -1){
        this.contatos.splice(index,1)
      }
    }
  }

}
