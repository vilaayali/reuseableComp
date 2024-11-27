import { createContext, useContext, useState } from "react";

export const authToken = createContext();

export const useAuth = () => useContext(authToken)
export const AuthTokenProvider = ({ children }) => {

    const [Token, setToken] = useState(null)
    const [globleBrands, setGlobleBrands] = useState([]);

    const saveToken = (newToken) => {
        setToken(newToken)
        localStorage.setItem('Token', newToken);
        console.log(newToken);
    }

    //SetBrands as Globally getting data from secondPage. 
    const SaveBrandsGloblly = (newBrands) => {
        setGlobleBrands(newBrands)
        localStorage.setItem('Brands', JSON.stringify(newBrands))
    }

    return (
        <authToken.Provider value={{ Token, saveToken, SaveBrandsGloblly, globleBrands, setGlobleBrands }} >
            {children}
        </authToken.Provider>
    );
}

