import { ChangeEvent } from "react"

type input = {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

export const InputBox = ({label, type, placeholder, onChange}: input) => {
    return <div className="flex flex-col py-2">
        <div className="mb-1 font-semibold">
            <label htmlFor={label}> {label} </label>
        </div>
        
        <input onChange={onChange} type={type || "text"} id={label} placeholder={placeholder} className="p-2 w-72 border rounded-md  focus:outline-none focus:ring-2 focus:ring-green-300"/>
    </div>
}   