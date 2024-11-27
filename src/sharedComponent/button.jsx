import React from 'react'

function Button({ onclick, lable }) {
    return (
        <>
            <button onClick={onclick}>{lable}</button>
        </>
    )
}

export default Button
