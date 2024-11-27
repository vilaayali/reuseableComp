import React, { useEffect, useState } from 'react'
import { useAuth } from '../componentContext/compContext';
import axios from 'axios';


function ReuseableInput() {
    // const [brands, setBrands] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { Token, SaveBrandsGloblly, globleBrands } = useAuth();

    const fetchBrands = async () => {
        try {
            const response = await axios.get(
                `https://insta-stag-be.eztech.club/logistics/SearchAbleBrand/`,
                {
                    headers: {
                        Authorization: `token ${Token}`,
                        "content-type": "application/json",
                    }
                }
            );
            // setBrands(response.data);
            SaveBrandsGloblly(response.data)
            return response;

        } catch (err) {
            console.error('Failed', err);
        }
    };

    useEffect(() => {
        const getbrands = async () => {
            if (!Token) {
                console.error('No token available');
                return;
            }

            if (globleBrands.length === 0) {
                const brand = await fetchBrands();
                console.log("brands", brand);
            }
        }
        getbrands()

    }, [Token, globleBrands])

    const searchBrands = globleBrands.filter((items) =>
        items.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handelInpute = ((e) => { setSearchQuery(e.target.value) })

    return (
        <>
            <span> </span>
            <span> </span>
            <h1>Brands List</h1>
            <input type="text"
                value={searchQuery}
                placeholder='Search'
                onChange={handelInpute}
            />

            {searchBrands.length > 0 ? (
                <ul>
                    {searchBrands.map((brand) => (
                        <li key={brand.id}>{brand.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No brands found or user not authenticated.</p>
            )}
        </>
    )
}

export default ReuseableInput;
