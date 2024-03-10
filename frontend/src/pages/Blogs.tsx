import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"
// import { Blog } from "./Blog"


export function Blogs() {
    const { blogs, loading } = useBlogs();

    if(loading) {
        return <div>
            <Appbar />
            <div className="pl-40 flex justify-center flex-col ">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        
        <div className="p-10 flex justify-center flex-col ">
            { blogs.map( (blog, index) => <BlogCard key={index}
                authorName={blog.author.name || "Anonymous"}
                id={ blog.id }
                title={blog.title}
                content={blog.content}
                publishDate={"4 Mar, 2024"} />
            )} 
        </div>
    </div>
}