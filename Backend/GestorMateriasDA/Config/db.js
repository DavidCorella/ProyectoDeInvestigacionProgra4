import {MongoClient} from "mongodb"

const connect = async() =>{
    try {
        const url = `mongodb://localhost:27017/GestorMaterias`;
        const client = await MongoClient.connect(url);
        return client.db();
    } catch (error) {
        console.log(error);
    }
}

export{ connect};

