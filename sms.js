const express = require('express')
const twilio = require('twilio');
const cors = require('cors')
const app = express()
 
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
var sid="AC3df806807f48bfbc2db1ed24f347fd6f"
var auth ='de4f31ad8d1c448ae4cb6b9280dce1d8'
function sendSMS(name,type)
{
  const client  =  new twilio(sid,auth);
    if (type =="Health Insurance")
    {
   return client.messages
   .create({
    body:"Congratulations "+name+" on registering for "+type+" insurance on our website!Soon one of our agents will contact you.",
   from:'+17079314951',
  to:'+918970145149'})
 
   .then(message =>{
      console.log(message,"Message Sent")
    })
   .catch(err=>{
    console.log(err,"Message not Sent")})
   }
   else
   {
    return client.messages
   .create({
    body:"Congratulations "+name+" on registering for "+type+"  insurance on our website!Soon one of our agents will contact you.",
 
   from:'+17079314951',
   to:'+918970145149'})
   .then(message =>{
      console.log(message,"Message Sent")
    })
   .catch(err=>{
    console.log(err,"Message not Sent")})
   }
}

app.post("/sendsms",(req,res)=>{
  console.log(req.body)
    const {name,type} = req.body;
    const temp='+91'+name;
    sendSMS(temp,type);
    // console.log(temp)
})

 

app.listen(5000,()=>{
  console.log("Listening at port 5000")
})


 