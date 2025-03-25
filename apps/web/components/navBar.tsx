
import React, { use } from 'react'
import { FcMoneyTransfer } from "react-icons/fc";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';



async function NavBar() {
    const session= await auth.api.getSession({
        headers:await headers()
    })
    return (
        <div className=' mt-4 px-4 border-b '>
           <div className='  flex items-center justify-between max-w-4xl mx-auto h-16'>

        
        <Link className='flex gap-2 justify-center items-center' href={'/'}>
        <FcMoneyTransfer size={40}/>
        <h1 className='font-bold'>Paytm</h1>
        </Link>
         
        <div>
        {
        session ? (
              <form action={ async () => {
                "use server"
                await auth.api.signOut({
                  headers: await headers()
                });
                redirect('/')
              }}>
                <Button type='submit'>Sign Out</Button>
              </form>
            ) :
              <Link href='/signin' className={buttonVariants()}>
                Sign In
              </Link>
          }
           
        </div>
        </div>
        </div>
    )
}

export default NavBar



