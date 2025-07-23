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
  editando = false;
  contatoIndex: number | null = null;

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

  editarContato(index:number){
    this.editando = true;
    this.contatoIndex = index;
    const contato = this.contatos[index];

    this.form.patchValue({
      nome: contato.nome,
      telefone: contato.telefone,
      email: contato.email,
      aniversario: contato.aniversario,
      tipo: contato.tipo,
    })
  }

  cancelarEdicao(){
    this.editando = false;
    this.contatoIndex = null;
    this.form.reset();
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
      (contato, i) => contato.telefone === telefone && (!this.editando || i !== this.contatoIndex)
    );

    if (telefoneExistente) {
      alert('Já existe um contato com este telefone!');
      return;
    }

    //adição do contato na lista de contatos
      const contato = Contato.criarContato(this.form.value);
      if(this.editando && this.contatoIndex !== null){
        this.contatos[this.contatoIndex] = contato;
        this.editando = false;
        this.contatoIndex = null;
      } else{
        this.contatos.push(contato);
      }
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
