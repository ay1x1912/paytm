"use client"
 
import { z } from "zod"
 import { sendSchema } from "@/lib/formSchema"
 import { zodResolver } from "@hookform/resolvers/zod"
 import { useForm } from "react-hook-form"
 import { Button } from "@/components/ui/button"
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
import { sendMoney } from "@/lib/actions"
import { toast } from "sonner"
function SendCard() {
    const form = useForm<z.infer<typeof sendSchema>>({
        resolver: zodResolver(sendSchema),
        defaultValues: {
          email: "",
          amount:0
        },
      })
     
      // 2. Define a submit handler.
     async function onSubmit(values: z.infer<typeof sendSchema>) {
     const {email,amount}=values
     const data = await sendMoney(email,amount);
        if(data?.success){
            toast("transfer successful")
        }
        else{
            toast(`transaction failed wiht error ${data?.message}`)
        }
        console.log(values)
      }
    
    return (
        <div className="min-w-2xl mx-auto border  rounded-2xl p-8 "> 
        <p></p>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eamil</FormLabel>
                <FormControl>
                  <Input className=" rounded-2xl"  type="email" placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input className=" rounded-2xl" type="number"  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-center">

          <Button type="submit">Submit</Button>
          </div>

        </form>
      </Form>
      </div>
    )

}
export default SendCard
