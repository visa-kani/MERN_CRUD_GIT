const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

// const connectDB = async() =>{
//     try{
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             useUnifiedTopology:true,
//             useNewUrlParser: true
//           (  mongoose.set('strictQuery',true))
//         });
//         console.log(`MongoDB Connected ${conn.connection.host}`);         
//     }catch(error){
//         console.error(`Error: ${error.message}`);
//         process.exit(1);
//     }
// }

// module.exports = connectDB;


const connectDB = () =>{
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
    })

    .then(()=>{
        console.log(`MongoDB Connected `);  
    })
    .catch((error)=>{
        console.error(`Error: ${error.message}`);
        process.exit(1);
    })
}

module.exports = connectDB;