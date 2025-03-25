import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export const GET= async()=>{
 const session = await auth.api.getSession({
    headers:await headers()
 })
 if(!session){
    return NextResponse.json({
        msg:'user is unauthorisex',
        
    },{
        status:403
    })


 }
 const user=session.user;
 return NextResponse.json({
    email:user.email,
    name:user.name
    
 })
}

