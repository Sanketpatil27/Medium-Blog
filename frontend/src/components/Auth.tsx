import { Link, useNavigate } from "react-router-dom"
import { InputBox } from "./InputBox"
import { useState } from "react"
import { signupInput } from "@sanketpatill27/medium-common"
import { BACKEND_URL } from "../config"
import axios from "axios"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<signupInput>({     // signin is subset of signup so no need to another generic
        email: "",
        name: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? 'signup' : 'signin'}`, postInputs);
            const jwt = response.data.jwt;
            console.log(response);
            console.log(jwt, 'adfaldjfajlakjdlka');
            localStorage.setItem("token", jwt);
            navigate("/blogs");

        } catch(e) {
            alert('Please provide Correct Inputs');
        }
    }

    return <div className="flex flex-col h-screen justify-center items-center">
        <div className="bg-while shadow-lg rounded-lg p-10 flex justify-center">
            <div className="px-10">
                <div className="text-2xl font-extrabold text-center">
                    {type === "signup" ? "Create an Account" : "Access Acount"}
                </div>
                <div className="text-slate-400 text-center mb-10">
                    { type === 'signin' ? "Don't have an account?" : "Already have an account?" }
                    <Link className="pl-2 underline" to={ type === 'signin' ? '/signup' : '/signin'}> 
                        { type === 'signup' ? "Sign in" : "signup" }
                    </Link>
                </div>

                { type === "signup" && <InputBox label={'Username'} placeholder={'Enter your username'} onChange={(e) => {
                    setPostInputs({
                        ...postInputs,          // existing usernmae & password
                        name: e.target.value
                    })
                }} />}

                <InputBox label={'Email'} placeholder={'Enter your email'} onChange={(e) => {
                    setPostInputs({
                        ...postInputs,          // existing usernmae & password
                        email: e.target.value
                    })
                }} />

                <InputBox label={'Password'} type={"password"} placeholder={'Enter your password'} onChange={(e) => {
                    setPostInputs({
                        ...postInputs,          // existing usernmae & password
                        password: e.target.value
                    })
                }} />

                <button onClick={ sendRequest } type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4">
                     { type === "signin" ? "Sign In" : "Sign Up" } 
                </button>

            </div>
        </div>
    </div>
}