import 'dotenv/config';
import  mongoose  from "mongoose";

//Carga de las variables de entorno desde el archivo .env


const mongoDB = process.env.MONGO_DB

const connect = async () =>{
    try {
        const db = await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const { name, host } = db.connection;
        console.log(`Connected with db: ${name}, in host: ${host}`)
    } catch (error) {
        console.log("Error to connect with DB", error)
}
}
export { connect }