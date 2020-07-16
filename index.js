const express=require("express");
const bodyParser=require("body-parser");
const fs=require("fs");
const app=express();

app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(bodyParser.json());

const port=1100;

app.get('/submit',(req,res)=>{
  res.sendFile(__dirname +'/index.html');
})
app.post("/submit",(req,res)=>{
     console.log(req.body);
     fs.readFile("./data.json","utf8",(err,data)=>{
         if(err)
         {
           console.log(err);
         }
         else{
           const obj=JSON.parse(data);
           obj.table.push({
             username:req.body.username,
             password:req.body.password,
             favcolor:req.body.color
           });
           const json=JSON.stringify(obj);
           fs.writeFile("./data.json",json,(err)=>{
             if(err)
             {
               return console.log(err);
             }
             else{
               console.log('data are stored');
               res.send(
                 {
                   status:"ok",
                   message:'submited'
                 }
               );
             }
           });
         }
     });
});
app.get("/user",(req,res)=>{
  fs.readFile("./data.json","utf8",(err,data)=>{
    if(err)
    {
      console.log(err);
    }
    else{
      obj=JSON.parse(data);
      res.send(obj);
    }
  })
})
app.listen(port,()=>{
  console.log(`hello i am running${port}`);
})
