export default class Calificacion {
    constructor(subjectId, grade, createdAt) {
        this.subjectId = subjectId;
        this.grade = grade;
        this.createdAt = createdAt;
    }

    GetSubjectId() {
        return this.subjectId;
    }

    SetSubjectId(subjectId) {
        this.subjectId = subjectId;
    }

    GetGrade() {
        return this.grade;
    }

    SetGrade(grade) {
        this.grade = grade;
    }
    GetCreatedAt(){
        return this.createdAt;
    }

    SetCreatedAt(createdAt){
        this.createdAt = createdAt;
    }
}