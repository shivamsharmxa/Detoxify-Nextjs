import mongoose from 'mongoose';
import { connected } from 'process';

const MONGODB_URI: string = process.env.MONGODB_URI!;

export async function connect(){
  try{
    mongoose.connect(MONGODB_URI)
    const connection = mongoose.connection

    connection.on('connected', () => {
      console.log('MongoDB connected')
    })
    connection.on('error', (err) => {
      console.log('MongoDB connection error, Please make sure db is up and running' + err);
      process.exit()

    })
  } catch (error){
    console.log("Something went wrong in connecting to DB");
    console.log(error);
  }
}