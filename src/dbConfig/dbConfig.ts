import 'dotenv/config';


console.log("MONGO_URL:", process.env.MONGO_URL);
console.log("TOKEN_SECRET:", process.env.TOKEN_SECRET);
console.log("DOMAIN:", process.env.DOMAIN);

import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection.setMaxListeners(15); // Set the maximum listeners to 15 (or a higher number if needed)
        

        connection.on('connected',()=>{
            console.log("Mongodb Connected");
        })

        connection.on('error',(err)=>{
            console.log("Mongodb connection error, Please make sure db is up and running"+err);
            process.exit();
        })
    } catch (error) {
        console.log("something went wrong in connecting to db");
        console.log(error);
    }
}
