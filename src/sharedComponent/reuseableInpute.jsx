import React, { useEffect, useState } from 'react';
import { useAuth } from '../componentContext/compContext';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

function ReuseableInput() {
    const [searchQuery, setSearchQuery] = useState('');
    const [localBrands, setLocalBrands] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const { Token, SaveBrandsGloblly, globleBrands } = useAuth();


    const fetchDefaultBrands = async () => {
        let url = 'https://insta-stag-be.eztech.club/logistics/SearchAbleBrand/'
        if (searchQuery) {
            url += `?search=${searchQuery}`
        }
        console.log(url);

        try {
            const response = await axios.get(
                url,
                {
                    headers: {
                        Authorization: `token ${Token}`,
                        "content-type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (err) {
            console.error('Failed to fetch default brands:', err);
        }
    };




    useEffect(() => {
        if (Token) {
            const getBrands = async () => {
                if (globleBrands.length === 0) {
                    const data = await fetchDefaultBrands();
                    if (data) {
                        SaveBrandsGloblly(data)
                        setLocalBrands(data);
                        setFilteredBrands(data)
                    }
                } else {
                    setLocalBrands(globleBrands);
                }
            }
            getBrands()

        }

    }, [Token, globleBrands]);



    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            const fetchBrandSearch = async () => {
                if (searchQuery) {
                    const fetchedData = await fetchDefaultBrands();
                    setFilteredBrands(fetchedData);
                }
                else {
                    setFilteredBrands(globleBrands)
                    // const filtered = localBrands.filter((brand) =>
                    //     brand.name.toLowerCase().includes(searchQuery.toLowerCase())
                    // );
                }
            }
            fetchBrandSearch();

        }, 700);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery, localBrands]);



    const handleInputChange = (event, value) => {
        setSearchQuery(value);
    };

    // console.log("local", localBrands, " globle", globleBrands);
    // console.log('search query', searchQuery);
    // console.log('Filtered', filteredBrands);


    return (
        <div>
            <h1>Brands List</h1>
            <Autocomplete
                options={filteredBrands}
                getOptionLabel={(option) => option.name || ''}
                inputValue={searchQuery}
                onInputChange={handleInputChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Brands"
                        variant="outlined"
                        placeholder="Search"
                        InputProps={{
                            ...params.InputProps,
                        }}
                    />
                )}
            />
        </div>
    );
}

export default ReuseableInput;
