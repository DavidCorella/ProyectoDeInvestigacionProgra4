
export default class Usuario {
    constructor(id, user, contrasenna, email) {
        this.id = id;
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

    GetID() {
        return this.id;
    }

    SetID(id) {
        this.id = id;
    }
}