import z from "zod"

export const signUpSchema=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(8,{message:"password must be of minimun 8 characters"})

})
export const signInSchema=z.object({
    email:z.string().email(),
    password:z.string().min(8,{message:"password must be of minimun 8 characters"})
})

export const transferSchema=z.object({
    Amount: z.coerce.number().min(1,{message:"must not be empty"}),
    Bank:z.enum(['HDFC','Axis Bank']),
})

export const sendSchema=z.object({
    email:z.string().email({message:"email is requird"}),
    amount:z.coerce.number().min(1)
})