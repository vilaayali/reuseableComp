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
            setFilteredBrands(response.data);
        } catch (err) {
            console.error('Failed to fetch default brands:', err);
        }
    };


    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.get(
                `https://insta-stag-be.eztech.club/logistics/brands/`,
                {
                    headers: {
                        Authorization: `token ${Token}`,
                        "content-type": "application/json",
                    },
                    params: { search: query },
                }
            );
            setFilteredBrands(response.data);

        }
        catch (err) {
            console.error('Failed to fetch search results:', err);
        }
    }


    useEffect(() => {
        if (Token && globleBrands.length === 0) {
            fetchDefaultBrands();
        } else if (Token) {
            setLocalBrands(globleBrands);
            setFilteredBrands(globleBrands);
        }
    }, [Token, globleBrands]);


    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (!searchQuery.trim()) {

                setFilteredBrands(localBrands);
            } else {

                const filtered = localBrands.filter((brand) =>
                    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                if (filtered.length > 0) {
                    setFilteredBrands(filtered);
                } else {
                    fetchSearchResults(searchQuery);
                }
            }
        }, 1000);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery, localBrands]);


    const handleInputChange = (event, value) => {
        setSearchQuery(value);
    };



    return (
        <div>
            <h1>Brands List</h1>
            <Autocomplete
                options={filteredBrands}
                getOptionLabel={(option) => option.name || ''}
                value={searchQuery}
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
