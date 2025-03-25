import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

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
