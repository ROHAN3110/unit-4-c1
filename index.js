let express=require("express");
let app=express();
app.use(logger)

app.get("/books",(req,res)=>{
return res.send({route:"/books"});
});

app.get("/libraries",checkpermission("librarian"),(req,res)=>{
 return res.send({ route: "/libraries", permission: true});
});



 app.get("/author",checkpermission("author"),(req,res)=>{
 return res.send( { route: "/authors", permission: true});
 });

 function logger(req,res,next){
     if(req.path==="/books"){
         req.role="books";
     }
     else if(req.path==="/author"){
        req.role="author";
    }
    else if(req.path==="/libraries"){
        req.role="labraries";
    }
    next();
 }

 function checkpermission(role){
     return function logger(req,res,next){
         if(req.path==="/librarian"){
        return next(); 
         }else if(role=="author"){
             return next();
         }
     }
 }


 app.listen(5000,()=>{
     console.log("listening on port 5000")
 })