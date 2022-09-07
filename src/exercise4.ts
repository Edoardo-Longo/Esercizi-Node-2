const express = require('express')

const app= express();

app.use((req: any,res:any,next:any)=>{
    res.header(
       { Headers:"Qui la mia header"}
    );
    next();
})



app.get('/',(req: any,res: any)=>{
res.status(200).send({json:"Un bel json"})
})

app.listen(process.env.PORT,()=>{console.log("[SERVER]: Server is running on http://localhost:3000")})

export default app;