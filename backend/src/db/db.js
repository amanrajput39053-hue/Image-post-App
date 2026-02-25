const mongoose=require('mongoose');
const dbUrl=process.env.MONGO_URL;

async function connect(){
    try{
        await mongoose.connect(dbUrl);  
        console.log("database connected")
    }catch(err){
        console.log(err);
    }
}

module.exports=connect;
