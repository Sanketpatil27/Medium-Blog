import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export function Appbar() {
    return <div className="border-b py-4 flex justify-between px-10">
        <Link to={'/blogs'}>
            <div className="cursor-pointer text-2xl font-medium"> 
                {/* <img className="h-11 rounded-full " src="https://www.dropbox.com/team/team_logo/dbtid%3AAACXpg8cm0XzfCIs1qaUSYqq-l6Ge7Q_pE4?v=1603320488672" alt="logo" /> */}
                Medium
            </div>
        </Link>
        <div className="flex justify-between">
            <Link to={'/publish'}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                    New Blog
                </button>
            </Link>
            <Avatar size="big" name="Sanket" />
        </div>
    </div>
}