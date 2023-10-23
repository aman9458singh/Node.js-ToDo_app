import mongoose from "mongoose"

const connectDb = ()=>{mongoose.connect(process.env.MONGO_URI,{dbName:"backendapi"})
.then(()=>{console.log("database connected")})
.catch((e)=>{console.log(e)})
}

export default connectDb;