import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signupInput, signinInput } from '@sanketpatill27/medium-common';


// add generic to the Hono for .env
const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	},
	Variables: {
		userId: string		// for setting in c.set()
	}
}>();


userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();

	const validate = signupInput.safeParse(body);
	if(!validate.success) {
		c.status(411);		// incorrect input
		return c.json({ msg: 'wrong credentials' });
	}

	const isExist = await prisma.user.findFirst({
		where: { email: body.email }
	})

	if(isExist)
		return c.json({ msg: "email already exist!" });

	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				name: body.name,
				password: body.password
			}
		});

		const token = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt: token });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up!!" });
	}
})

userRouter.post('/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const validate = signinInput.safeParse(body); 
	if(!validate.success) {
		c.status(411);		// incorrect input
		return c.json({ msg: "Invalid Credentials! "});
	}
	
	try {
		const user = await prisma.user.findFirst({
			where: { 
				email: body.email,
				password: body.password 
			}
		});

		if(!user) {
			c.status(403);		// unauthorized
			return c.json({ msg: "User Not Found!!" });
		}

		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	}
	catch(e) {
		return c.json({ msg: "Something went wrong!!!" });
	}
})

export default userRouter;
