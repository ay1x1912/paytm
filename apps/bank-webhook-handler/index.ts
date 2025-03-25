import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { prisma} from '@repo/db/prisma'
const app=express();
app.use(express.json())
app.use(cors())

//endpoint that hdfc bank will hit to inform about the payment
app.post('/hdfcwebhook', async(req:Request,res:Response)=>{
 
    const {userId,amount,token}=req.body
    try{
        await prisma.$transaction([
        prisma.balance.update({
            where:{
                userId
            },
            data:{
                balance:{
                    increment:amount
                }
            }
        }),
        prisma.onRampTransaction.update({
            where:{
                token
            },
            data:{
                status:"Success"
            }
        })
    ])
    }catch(e){
        console.log(e)
        prisma.onRampTransaction.update({
            where:{
                token
            },
            data:{
                status:'Failure'
            }
        })
    }
    res.status(200).json({
        msg:"captured",
        
    })
})

app.post('hdfcwebhook')
app.listen('8000',()=>{
    console.log('listeing on poart 8000');
})