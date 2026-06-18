import mongoose from "mongoose"


import dns from "dns"
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

const connectDb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("db connnected")
    }
    catch(error){
        console.log(error)
    }
}

export default connectDb;