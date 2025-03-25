import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { getBalance} from '@/lib/actions'
async function BalanceComponent() {
  const balance=await getBalance()
   
    return (
        <Card>
  <CardHeader>
    <CardTitle>Balance</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Total Balance:{balance?.balance}</p>
  </CardContent>
</Card>

    )
}

export default BalanceComponent
