import { auth } from '@/lib/auth'
import { prisma } from '@repo/db/prisma'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import {useCounterStore} from '@repo/zust/useCounterStore'
async function DashbaordPage() {
    
    const session=await auth.api.getSession({
        headers:await headers()
    })

    if(!session){
       return redirect('/')
    }
    const user=session.user;
     return (
        <div className='flex justify-center h-full items-center'>

    
        <div>
            hello from dashbaord
            <ul>
                <li>
                    name:{user.name}
                </li>
                <li>
                    email:{user.email}
                </li>
            </ul>
        </div>
        </div>
    )
}

export default DashbaordPage
