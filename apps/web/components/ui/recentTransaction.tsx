import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { getOnRampTranactons } from '@/lib/actions'
import TransactionComponent from '../tranactionComponent'
import { date } from 'zod'

async function RecentTransaciton({}) {
   
 const trnx=await getOnRampTranactons()
    return (
        <Card>
  <CardHeader>
    <CardTitle>Recent Transaction</CardTitle>
  </CardHeader>
  <CardContent>
    {trnx.map((trn:any,ind)=>
       <TransactionComponent key={ind} amount={trn.amount}  date={trn.time}/>)}
  </CardContent>
</Card>

    )
}

export default RecentTransaciton
