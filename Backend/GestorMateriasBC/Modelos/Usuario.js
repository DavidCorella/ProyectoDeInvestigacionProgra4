
export default class Usuario {
    constructor(user, contrasenna, email) {
        this.user = user;
        this.contrasenna = contrasenna;
        this.email = email;
    }

    GetUser() {
        return this.user;
    }

    SetUser(user) {
        this.user = user;
    }

    GetContrasenna() {
        return this.contrasenna;
    }

    SetContrasenna(contrasenna) {
        this.contrasenna = contrasenna;
    }

    GetEmail() {
        return this.email;
    }

    SetEmail(email) {
        this.email = email;
    }
}