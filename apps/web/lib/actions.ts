"use server";

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { prisma } from '@repo/db/prisma';
import { redirect } from 'next/navigation';

export async function signOutAction() {
    await auth.api.signOut({
        headers: await headers()
    });

    revalidatePath('/'); // Forces re-fetch of the NavBar session state
}

export  async function getBalance(){
 const session=await auth.api.getSession({
  headers:await headers()
 })
 const balance=await prisma.balance.findFirst({
  where:{
    userId:session?.user.id
  }
 })
 return {
  balance:balance?.balance
 }
}

export const getOnRampTranactons =async()=>{
 const session=await auth.api.getSession({
  headers:await headers()
 })
const trnx= await prisma.onRampTransaction.findMany({
  where:{
    userId:session?.user.id
  }
})
 return trnx.map((trn:any)=>({
  time:trn.startDate,
  amount:trn.balance,
  status:trn.status,
  provider :trn.provider
 }))
}

export const addOnRamp=async({amount,provider}:{
  amount:number,
  provider:string,
})=>{
  const session=await auth.api.getSession({
    headers: await headers()
  })
  if(!session?.user.id){
    console.log('user not found')
  }
  const token=Math.random().toString()
  
   await prisma.onRampTransaction.create({
    data:{
      userId:session?.user.id as string,
      balance:amount,
      provider,
      token: token
    }
  })
  
  revalidatePath("/tranfer")
  return {
    message:'onRamp created'
  }
}



export const sendMoney= async(email:string , amount:number)=>{
  if(!email || !amount){
    return {
      success:false,
      message:"email or ammount missing"
    }
  }
  const session=await auth.api.getSession({
    headers:await headers()
  })
  if(!session || !session.session.userId){
    return {
      success:false,
      message:"unotherized request"
    }
  }
  const to= await prisma.user.findFirst({
    where:{
      email
    }
  })
  if(!to){
    return{
      success:false,
      message:`${email} not found`
    }
  }
  const tranfer= await prisma.$transaction(
    async (tx:any) =>{
  //  lock the tranaction
try{await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${session.session.userId} FOR UPDATE`
const formBalance=await tx.balance.findUnique({where:{userId:session.session.userId}})
if(!formBalance || formBalance.balance<amount){
   throw new Error('insufficient balance')
}
await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${to.id} FOR UPDATE`
await tx.balance.update({
  where:{
    userId:session.session.userId
  },data:{
    balance:{
      decrement:amount
    }
  }
})
const finalToBalance=tx.balance.update({
  where:{
    userId:to.id
  },data:{
    balance:{
      increment:amount
    }
  }
})
return{
  success:true,
 message:"transfer completed successfully"
}}
catch(error){
  console.error("Error in sendMoney:", error);
  return { success: false, message: "Transaction failed",};
 
}
    }


  )



}