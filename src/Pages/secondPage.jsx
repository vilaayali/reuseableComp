import React, { useEffect, useState } from 'react';
import { useAuth } from '../componentContext/compContext';
import Input from "../sharedComponent/Input";
import axios from 'axios';
import ReuseableInput from '../sharedComponent/reuseableInpute';


const BrandList = () => {
    return (
        <>
            <h1>Second Page</h1>
            <ReuseableInput />

        </>
    );
};

export default BrandList;
