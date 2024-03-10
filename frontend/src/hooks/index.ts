import axios from "axios";
import { useEffect, useState } from "react"

export interface Blog {
    "name": string,
    "title": string,
    "content": string,
    "id": string,
    "author": {
        "name": string
    }
}

export const useBlog = ( { id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`https://backend.spatil270403.workers.dev/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then((response) => {
            setBlog(response.data);
            setLoading(false);
        })
        // console.log(localStorage.getItem('token'));
    }, [id])

    return {
        loading,
        blog
    } 
}

// all blogs
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get('https://backend.spatil270403.workers.dev/api/v1/blog/bulk', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        .then((response) => {
            setBlogs(response.data.posts);
            setLoading(false);
        })
        // console.log(localStorage.getItem('token'));
    }, [])

    return {
        loading,
        blogs
    }
}   