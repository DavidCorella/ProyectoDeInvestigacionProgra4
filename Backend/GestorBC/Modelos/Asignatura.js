export default class Asignatura {
    constructor(userId, name, description, createdAt) {
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
    }

    GetUserId() {
        return this.userId;
    }

    SetUserId(userId) {
        this.userId = userId;
    }

    GetName() {
        return this.name;
    }

    SetName(name) {
        this.name = name;
    }

    GetDescription() {
        return this.description;
    }

    SetDescription(description) {
        this.description = description;
    }

    GetCreatedAt(){
        return this.createdAt;
    }

    SetCreatedAt(createdAt){
        this.createdAt = createdAt;
    }
}