import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"


export function FullBlog({ blog }: {blog: Blog}) {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="flex md:grid md:grid-cols-12 md:w-full md:px-10 md:pt-20 md:max-w-screen-xl">
                <div className="md:col-span-8">
                    <div className="text-4xl font-extrabold"> 
                        { blog.title }
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 2nd december 2024
                    </div>
                    <div className="pt-4">
                        { blog.content }
                    </div>
                </div>
                <div className="hidden col-span-4 lg:block">
                    <div className="text-lg text-slate-600">
                        Author
                    </div>
                    <div className="flex">
                        <div className="flex items-center">
                            <Avatar size="big" name={ blog.author.name || "Anonymous" } />
                        </div>
                        <div className="pl-2">
                            <div className="text-2xl font-bold pt-4">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Master of mirth, purveyar of puns, and the funniest person in the kingdom.
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
}