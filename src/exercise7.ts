import prisma from "./client"

const express = require('express')

const app= express();

app.use((req: any,res: any,next: any)=>{
    res.header(
       { Headers:"Qui la mia header"}
    );
    next();
})

app.get('/',async (req: any,res: any)=>{
    const data = await prisma.exercise5.findMany();
    res.send(data)
})

app.listen(process.env.PORT,()=>{console.log("[SERVER]: Server is running on http://localhost:3000")})

export default app;