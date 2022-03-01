import { createContext, useState, useEffect } from "react";
import ProductsAPI from "./API/productsAPI";
import axios from "axios"
import CategoriesAPI from "./API/CategoriesAPI";
import UserAPI from "./API/UserAPI";

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
     const [token, setToken] = useState(false)

     useEffect(() => {
        const login = localStorage.getItem('Login')
         const reftoken = localStorage.getItem('refreshtoken')
        if(login){
            const refreshToken = async () =>{
                const response = await axios.post('https://shoppeecom.herokuapp.com/user/refresh_token',{
                 
                        "reftoken":reftoken
                    
                })
                setToken(response.data.accesstoken)
                 console.log(token)
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])
    
    const statedData = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        categoriesAPI: CategoriesAPI(token),
        userAPI: UserAPI(token)
    }

    return (
        <GlobalState.Provider value={statedData}>
            {children}
        </GlobalState.Provider>
    )
}
