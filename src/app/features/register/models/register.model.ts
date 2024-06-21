export class RegisterModel {
    email: string;
    password: string;
    password_confirmation: string;
    username: string;
    birthDate: string;

    constructor(data: any={}){
        this.email = data.email || null;
        this.password = data.password || null;
        this.password_confirmation = data.password_confirmation || null;
        this.username = data.username || null;
        this.birthDate = data.birthDate || null;
    }
}