
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const serverless = require("serverless-http");
const app = require('./app');

mongoose.connection.on('connected',()=>console.log('connected'));
mongoose.connection.on('disconnected',()=>console.log('disconnected'));
mongoose.connection.on('error',(error)=>console.log(error));
app.get("/home",(req, res) => {
    res.status(200).send({msg:"Working App"});
  });

  
app.listen(process.env.PORT || 4000,async ()=>{
    // const bcrypt = require('bcrypt');
    // console.log(await bcrypt.compare('test1234','$2b$10$2Zm.C4MqMc8JPNlgQoptKugft0Y1TKAnHEIvnsu4CUfk9.vq4G4SC'));
     mongoose.connect(process.env.DATABASE);
   
    console.log(`listening on port ${process.env.PORT || 3000}`);
})

module.exports = {
    handler: serverless(app),
  };