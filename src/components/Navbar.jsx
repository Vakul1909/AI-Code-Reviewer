import React from "react";
import { Bot} from 'lucide-react';

const Navbar = () => {
    return (
        <>
            <div className="nav flex items-center justify-between  h-[90px] bg-zinc-900 " style={{padding:"0px 80px"}}>
                <div className="logo flex items-center gap-[15px]">
                    <Bot  color="purple" size={60} />
                    <span className="text-3xl font-bold text-white ml-2">CodeMate</span>
                </div>
            </div>
        </>
    )
}
export default Navbar