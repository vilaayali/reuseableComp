import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../componentContext/compContext';
import Button from '../sharedComponent/button'
import Input from '../sharedComponent/searchAbleInput'

function FirstPage() {
    const { saveToken } = useAuth();
    const [Data, setData] = useState([])
    const [usernameOrEmail, setusernameOrEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        localStorage.setItem("Token", Data)
    }, [Data])

    const fetchApi = async () => {
        try {
            const response = await axios.post('https://insta-stag-be.eztech.club/signin', {
                usernameOrEmail,
                password,
                // usernameOrEmail: 'vilaay-xonity',
                // password: 'Vilaay@Xonity-4321',
            });
            // setData([response.data.token]);
            const getToken = response.data.token;
            saveToken(getToken)
            alert('successes');
        } catch (err) {
            console.error('Error:', err);
            alert('there was an error ');
        }
    };

    const handelPassword = (e) => setPassword(e.target.value)
    const handelEmail = (e) => setusernameOrEmail(e.target.value)

    return (
        <>
            <h1>First Page</h1>
            <Input
                type={'text'}
                value={usernameOrEmail}
                placeholder={'UserName'}
                onChange={handelEmail}
            />
            <Input
                type={"password"}
                value={password}
                placeholder={'Password'}
                onChange={handelPassword}
            />
            <Button lable={'Get Data'} onclick={fetchApi} />
        </>
    );
}

export default FirstPage
