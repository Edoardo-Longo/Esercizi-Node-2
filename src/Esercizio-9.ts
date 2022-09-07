import prisma from "./client"
const cors=require('cors');
const express = require('express')
const app= express();

const corsOption={
    origin:'http://localhost:8080'
}
app.use(express.json())
app.use(cors(corsOption))


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

app.post('/post',async (req: any,res: any)=>{
    const info = req.body;
    const data = await prisma.exercise5.create({data:{name:info.name}})
    res.status(201).json(data)

})

app.put('/put/:id(\\d+)',async (req: any,res: any,next: any)=>{
    const info = Number(req.params.id);
    const update = req.body;
    try{
        const data = await prisma.exercise5.update({
            where:{id:info},
            data:{
                name: update.name
            }
        })
        res.status(200).json(data)
    }
    catch(err){
        res.status(404);
        next(`Cannot PUT /put/${info}`)
    }

})

app.delete("/delete/:id(\\d+)",async (req: any,res: any,next: any)=>{
    const info=Number(req.params.id)
    try{
         await prisma.exercise5.delete({
            where:{id:info}
        })
        res.status(204).end()
    }
    catch(err){
        res.status(404);
        next(`Cannot DELETE /planets/${info}`)
    }
})



app.listen(process.env.PORT,()=>{console.log("[SERVER]: Server is running on http://localhost:3000")})

export default app;