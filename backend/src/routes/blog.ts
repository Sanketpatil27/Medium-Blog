import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@sanketpatill27/medium-common';

// add generic to the Hono for .env
const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string
	},
	Variables: {
		userId: string		// for getting in c.get()
	}
}>();


blogRouter.use('/*', async(c, next) => {
	const authHeader = c.req.header('authorization');

	if(!authHeader || !authHeader.startsWith('Bearer '))
	{
		c.status(403);
		return c.json({ msg: "please provide token..." });
	}

	const token = authHeader.split(' ')[1];		// extract "Bearer "

	try {
		const payload = await verify(token, c.env.JWT_SECRET);
		if(!payload.id) {
			c.status(401);
			return c.json({ msg: "unauthorized" })
		}

		c.set('userId', payload.id);		// payload contains the userId
		await next();

	} catch (e) {
		c.status(403);
		return c.json({ msg: "Token Invalid!!!" });
	}
})


blogRouter.post('/', async (c) => {
	const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const validate = createBlogInput.safeParse(body);
	if(!validate.success) {
		c.status(411);		// incorrect input
		return c.json({ msg: 'wrong Data' });
	}

    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: c.get('userId')
        }
    })

    return c.json({ id: post.id });
})

// body should be: id of post that have to update, updated title, content (you should be owner for this)
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const userId = c.get('userId');
    const body = await c.req.json();
    const validate = updateBlogInput.safeParse(body);
	if(!validate.success) {
		c.status(411);		// incorrect input
		return c.json({ msg: 'wrong Data' });
	}

    try {
        const res = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            }, 
            data: {
                title: body.title,
                content: body.content
            }
        });

        return c.json({ msg: "post updated successfully" });
    } catch(e) {
        return c.json({ msg: "you can't access others post/post not found!!" });
    }
})


// Todo: add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({});

    return c.json({ posts });
})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL  
    }).$extends(withAccelerate());

    const id = c.req.param('id');
    const post = await prisma.post.findFirst({
        where: { id }, 
        select: {
            title: true,
            content: true,
            author: {
                select: { name: true }
            }
        }
    });

    if(!post) {
        c.status(403);
        return c.json({ msg: "Post not Found!!!" });
    }
    
	return c.json(post);
})

blogRouter.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL  
    }).$extends(withAccelerate());

    try {
        const id = c.req.param('id');
        await prisma.post.delete({
            where: { id }
        });

        return c.json({ msg: "deleted" });
    } catch (e) {
        return c.json({ msg: "no post found!!" });
    }
});


export default blogRouter;