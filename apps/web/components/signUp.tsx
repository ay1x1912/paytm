"use client"
import React, { useState } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,

} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from './ui/button'
import { signUpSchema } from '@/lib/formSchema'
import Link from 'next/link'
import {  signIn, signUp } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const SignUp=() =>{
  const router=useRouter()
    const [loading,setLoading]=useState(false)
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const {email,password,name}=values;
    try {
      await signUp.email({
          name: values.name,
          email: values.email,
          password: values.password,
          callbackURL:"/dashboard"
      }, {
          onResponse: () => {
              setLoading(false)
          },
          onRequest: () => { 
              setLoading(true)
              toast("request sent")
              
          },
          onSuccess: () => {
               setLoading(false)
              form.reset()
              toast("Signed successfully")
        
        
          },
          onError: (ctx) => {
             toast(ctx.error.message)
            console.log(ctx.error.message)
          },
      });
  } catch (error) {
      console.log(error)
       toast("something went wrong");
  }
  }

  return (
    <div>
    <Card className='max-w-3xl w-full'>
  <CardHeader>
  <CardTitle>Login</CardTitle>
  <CardDescription>Enter your email below to login to your account</CardDescription>
</CardHeader>
<CardContent>
  <div>
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input type='text' placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
	   <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type='email' placeholder="shadcn@uniqye.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>password</FormLabel>
            <FormControl>
              <Input type='password' autoComplete='true' placeholder="******" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button className='w-full' type="submit">Submit</Button>
    </form>
  </Form>
  </div>
</CardContent>
<CardFooter className='flex flex-col gap-4'>
  
    <Button onClick={ async()=>{
       await signIn.social({
        provider:'google'
       })
    }} className='w-full' variant={'outline'}>Login wiht Google</Button>
    <span className='flex gap-1'>
    <p>Already have an account?</p>
    <Link href={'/signin'}>SignIn</Link>
    </span>
</CardFooter>
</Card>


  </div>
  )
}


export default SignUp
