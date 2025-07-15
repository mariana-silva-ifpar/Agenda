import { Tipo } from "./tipo";

export class Contato {
    private _nome: string;
    private _telefone: string;
    private _email: string;
    private _aniversario: string;
    private _tipo: Tipo;

    constructor(){
        this._nome = '';
        this._telefone = '';
        this._email = '';
        this._aniversario = '';
        this._tipo = Tipo.familiar;

    }

	get nome(): string {  
		return this._nome;  
	}
	
	set nome(value: string) {  
		this._nome = value;  
	}


	
	get telefone(): string {  
		return this._telefone;  
	}
	
	set telefone(value: string) {  
		this._telefone = value;  
	}


	
	get email(): string {  
		return this._email;  
	}
	
	set email(value: string) {  
		this._email = value;  
	}


	
	get aniversario(): string {  
		return this._aniversario;  
	}
	
	set aniversario(value: string) {  
		this._aniversario = value;  
	}


	
	get tipo(): Tipo {  
		return this._tipo;  
	}
	
	set tipo(value: Tipo) {  
		this._tipo = value;  
	}
}