import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { FullBlog } from "../components/FullBlog";
import { FullBlogSkeleton } from "../components/FullBlogSkeleton";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";

export function Blog() {
    const { id } = useParams();
    const { loading, blog } = useBlog( {
        id: id || ""
    });

    if(loading) {
        return <div>   
                <Appbar />
                <div className="pl-40 flex justify-center flex-col ">
                    <div>
                        <BlogSkeleton />
                    </div>
                </div>
        </div>
    }

    return <div>
        <FullBlog blog={blog} />
    </div>
}