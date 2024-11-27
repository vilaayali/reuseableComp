import React, { useEffect, useState } from 'react';
import { useAuth } from '../componentContext/compContext';
import Input from "../sharedComponent/searchAbleInput";
import axios from 'axios';

const BrandList = () => {
    const { Token, SaveBrandsGloblly } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        if (!Token) {
            console.error('No token available');
            return;
        }

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


                setBrands(response.data);

                //set brands in globleStorage  
                SaveBrandsGloblly(response.data)

            } catch (err) {
                console.error('Failed', err);
            }
        };

        fetchBrands();

    }, [Token]);

    const handelSearchInput = (e) => setSearchQuery(e.target.value)

    console.log(searchQuery);

    return (
        <div>
            <h1>Brand List</h1>
            <Input
                type={"text"}
                placeholder={"Search For Brands"}
                value={searchQuery}
                onChange={handelSearchInput}
            />
            {brands.length > 0 ? (
                <ul>
                    {brands.map((brand) => (
                        <li key={brand.id}>{brand.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No brands found or user not authenticated.</p>
            )}
        </div>
    );
};

export default BrandList;
