"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { transferSchema } from '@/lib/formSchema'
import {z} from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { addOnRamp } from '@/lib/actions'


const suportedBanks=[{
  name:"HDFC",
  redirectUrl:"https://netbanking.hdfcbank.com"
},
{
  name:"Axis Bank",
  redirectUrl:"https://www.axisbank.com/"
}]
function AddMoneyComponent() {
   const [redirectUrl , setRedirectUrl]=useState(suportedBanks[0]?.redirectUrl)
   
    const form = useForm<z.infer<typeof transferSchema>>({
        resolver: zodResolver(transferSchema),
        defaultValues: {
          Amount:0,
          Bank:"HDFC"
        },
      })
  async  function onSubmit(values: z.infer<typeof transferSchema>) {
   const res= await addOnRamp(
    {
      amount:values.Amount,
      provider:values.Bank
    }
    )
  
        window.location.href=redirectUrl as string;
        }
    return (
        <div className='border p-10 space-y-4 rounded-2xl '>
            <h1 className='text-4xl  text-center'>Add Money</h1>
             <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name='Amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input  type='number'  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Bank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank</FormLabel>
              <Select  onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue  />
                  </SelectTrigger>
                </FormControl>
                <SelectContent  >
                  {suportedBanks.map((bank,ind)=><SelectItem onSelect={(value)=>console.log(value)} key={ind} value={bank.name}>{bank.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=' text-center'>
        <Button type="submit" >Add Money</Button>
            
        </div>
      </form>
    </Form>
        </div>
    )
}

export default AddMoneyComponent
