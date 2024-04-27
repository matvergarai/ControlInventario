
export class UsuarioDto {
    id: number;
    username: string;
    password: string
    description: string;

    constructor(id:number,username: string, password: string, description: string){
        this.id=id;
        this.username = username;
        this.password = password;
        this.description = description;
    }
    
}