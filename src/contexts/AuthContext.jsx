/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useContext, useEffect, useState }from "react";
import {Outlet} from "react-router-dom"
import { auth } from "../firebase";
// eslint-disable-next-line react-refresh/only-export-components
const AuthContext = React.createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider() {
    const [loading, setloading] = useState(true);
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth,(user)=>{
            if(user){
                setCurrentUser(user);
                setloading(false);
            }else{
                setloading(false);
                console.log("user not found")
            }
        });
        
        return unsubscribe;
    },[]);




    //signup function;
    // eslint-disable-next-line no-unused-vars
    async function signup(email,password,username){
        await createUserWithEmailAndPassword(auth,email,password);

        await updateProfile(auth.currentUser,{
            displayName:username,
        });
        
        const user = auth.currentUser;
        setCurrentUser({...user,});
    }
    

    //
    //loging function;

    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password);
    }


    //
    // logout function;
    function logout(){
         
         signOut(auth);
         setCurrentUser("")
    }



    const value = {
        currentUser ,
        signup ,
        login ,
        logout ,
    }

    return (
        <AuthContext.Provider value={value} >
            {!loading && <Outlet/>}
        </AuthContext.Provider>
    )


}
