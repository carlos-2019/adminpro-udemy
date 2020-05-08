export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        // ? es para que la variable sea opcional
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) {}
}