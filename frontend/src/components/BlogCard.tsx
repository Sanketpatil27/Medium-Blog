import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishDate: string,
    id: string
}

export function BlogCard({
    id,
    authorName,
    title,
    content,
    publishDate,
}: BlogCardProps) {

    return <Link to={`/blog/${id}`}>
        <div className="flex justify-center">
            <div className="p-4 w-full max-w-6xl cursor-pointer mt-4">
                <div className="flex">
                    <div className="flex justify-center flex-col">
                        <Avatar name={authorName} size="small" />
                    </div>
                    <div className="pl-2">
                        {authorName}
                    </div>
                    <div className="flex pl-2 text-slate-400">
                        &#xb7;
                        <div className="pl-1">
                            {publishDate}
                        </div>
                    </div>
                </div>
                <div className="font-extrabold text-2xl mt-2">
                    {title}
                </div>
                <div className="font-medium text-slate-500">
                    {content.slice(0, 200) + "...."}
                </div>
                <div className="mt-6 text-sm text-slate-500">   {/* Reading Time */}
                    {`${Math.ceil(content.length / 100)} min read`}
                </div>
                <div className="bg-slate-200 h-[1px] w-full mt-4">

                </div>
            </div>
        </div>
    </Link>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
        <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
            {name[0]}
        </span>
    </div>
}