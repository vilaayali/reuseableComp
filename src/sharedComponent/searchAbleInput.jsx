import React from 'react'

function SearchAbleInput({ type, placeholder, value, onChange }) {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    )
}

export default SearchAbleInput
