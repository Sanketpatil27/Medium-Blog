import z from 'zod'

// zod validation
export const signupInput = z.object({
	email: z.string().email(),
	name: z.string(),
	password: z.string(),
})

export const signinInput = z.object({
	email: z.string().email(),
	password: z.string().min(4, { message: "password must of atleast of 4 length" }),
})

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
})

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
})


// type inference for frontend to know the type that being used
export type signupInput = z.infer<typeof signupInput>
export type signinInput = z.infer<typeof signinInput>
export type createBlogInput = z.infer<typeof createBlogInput>
export type updateBlogInput = z.infer<typeof updateBlogInput>