import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import React from 'react'

 async function ProctectdLayout({children}:{children:React.ReactNode}) {

    const session= await auth.api.getSession({
        headers: await headers()
    })
    if(!session?.user){
        redirect('/signin')
    }
    return (
        <>
        {children}
        </>
    )
}

export default ProctectdLayout
