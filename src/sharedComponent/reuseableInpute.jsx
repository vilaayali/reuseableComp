import React, { useEffect, useState } from 'react';
import { useAuth } from '../componentContext/compContext';
import axios from 'axios';

function ReuseableInput() {
    const [searchQuery, setSearchQuery] = useState('');
    const [localBrands, setLocalBrands] = useState([]);
    const { Token, SaveBrandsGloblly, globleBrands } = useAuth();


    const fetchBrands = async () => {
        try {
            const response = await axios.get(
                `https://insta-stag-be.eztech.club/logistics/SearchAbleBrand/`,
                {
                    headers: {
                        Authorization: `token ${Token}`,
                        "content-type": "application/json",
                    },
                }
            );
            SaveBrandsGloblly(response.data);
            setLocalBrands(response.data);
        } catch (err) {
            console.error('Failed to fetch brands:', err);
        }
    };


    useEffect(() => {
        if (!Token || globleBrands.length > 0) return;
        fetchBrands();
    }, [Token, globleBrands]);


    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);


        if (query) {
            const filtered = globleBrands.filter((brand) =>
                brand.name.toLowerCase().includes(query.toLowerCase())
            );
            setLocalBrands(filtered);
            console.log('filtered brands from local', filtered);

        } else {
            setLocalBrands(globleBrands);
        }
    };


    const handleFocus = () => {
        if (localBrands.length === 0) {
            setLocalBrands(globleBrands);
        }
    };

    return (
        <div>
            <h1>Brands List</h1>
            <input
                type="text"
                value={searchQuery}
                placeholder="Search"
                onChange={handleInputChange}
                onFocus={handleFocus}
            />
            {localBrands.length > 0 ? (
                <ul>
                    {localBrands.map((brand) => (
                        <li key={brand.id}>{brand.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No brands found or user not authenticated.</p>
            )}
        </div>
    );
}

export default ReuseableInput;
