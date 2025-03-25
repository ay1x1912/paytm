"use client"
import React from 'react'
import { prisma } from '@repo/db/prisma'
import { useCounterStore } from '@repo/zust/useCounterStore'
import { Button } from '@/components/ui/button'
// import{useCounterStore} from '@repo/zust'
function Home() {
const {count,inc}=useCounterStore()
  return (
    <div className='flex justify-center items-center h-screen'>
      {count}
      hello world 
      <Button onClick={()=>inc()}>inc</Button>
    </div>
  )
}

export default Home
