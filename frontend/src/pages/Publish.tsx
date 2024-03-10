import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    return <div>
        <Appbar />
        <div className="flex justify-center pt-5">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value);
                }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title" />

            <TextEditor onChange={(e) => {
                setContent(e.target.value);
            }}/>

            <button type="submit" onClick={async() => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title, 
                    content
                }, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });

                navigate(`/blog/${response.data.id}`)
            }} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Publish post
            </button>
            </div>
        </div>
    </div>
}

function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div>

            <div className="w-full mt-2 mb-4 border">
                <div className="flex items-center justify-between border-b ">
                    <div className=" bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea onChange={onChange} id="editor" rows={8} className="pl-2 block w-full px-0 text-sm text-gray-800 border-0 focus:outline-none  " placeholder="Write an article..." required />
                </div>
            </div>
            </div>
        
    </div >
}