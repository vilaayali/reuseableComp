import axios from 'axios';
import React, { useEffect, useState } from 'react'
function FirstPage() {

    const [Data, setData] = useState([])

    useEffect(() => {
        localStorage.setItem("Token", Data)
    }, [Data])

    const fetchApi = async () => {
        try {
            const response = await axios.post('https://insta-stag-be.eztech.club/signin', {
                usernameOrEmail: 'vilaay-xonity',
                password: 'Vilaay@Xonity-4321',
            });
            setData([response.data.token]);
            alert('successes');
        } catch (err) {
            console.error('Error:', err);
            alert('there was an error ');
        }
    };


    return (
        <>
            <h1>First Page</h1>
            <button onClick={fetchApi}>Get Data</button>
        </>
    );
}

export default FirstPage
