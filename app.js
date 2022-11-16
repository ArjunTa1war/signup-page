const express = require("express")
const bodyParser = require("body-parser")
const request = require("request") 

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
 var fName = req.body.fName;
 var lName = req.body.lName;
 var eMail = req.body.mail;
 var data = {
    members:[
        {
            email_address:eMail,
            status:"subscribed",
            merge_fields:{
              FNAME : fName,
              LNAME : lName

            }
        }
    ]
 }
 var jsonData = JSON.stringify(data);
 var option = {
    url : "https://us21.api.mailchimp.com/3.0/lists/462f81471a",
    method :"Post",
    headers:{
        "Authorization":"arjun dd2932f93cff741011644b7a4d6a36fb-us21"
    },
    body : jsonData 
 }

 request(option,function(error, response,body){
     if(error){
        res.sendFile(__dirname+"/failure.html")
     }
     else{
         if(res.statusCode===200){
         res.sendFile(__dirname+"/success.html")
         }
         else{
            res.send(__dirname+"/failure.html")
         }
     }
 })
})

app.post("/failure",function(req,res){
     res.redirect("/");
})

app.listen(process.env.PORT ||3000,function(){
    console.log("server is running on port 3000");
}) 
