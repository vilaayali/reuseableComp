import React from 'react'
import { useState } from "react";
function Shared({}) {
    const [Input, setInput] = useState("")

    const handelInput = ((e) => { setInput(e.target.value) })
    return (
        <>
            <div class="dropdown">
                <div id="myDropdown" className="dropdown-content">
                    <input type="text" placeholder="Search.." value={Input} onChange={handelInput} />
                    
                </div>
            </div>
        </>
    )
}
export default Shared