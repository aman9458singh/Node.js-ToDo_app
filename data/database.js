import mongoose from "mongoose"

const connectDb = ()=>{mongoose.connect(process.env.MONGO_URI,{dbName:"backendapi"})
.then((c)=>{console.log(`database connected on ${c.connection.host}`)})
.catch((e)=>{console.log(e)})
}

export default connectDb;