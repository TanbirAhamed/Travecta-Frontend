import React, { createContext, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { useEffect } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';


export const AuthContext = createContext(null)


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const axiosPublic = useAxiosPublic();

    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createNewUser,
        updateUserProfile,
        userLogin,
        logOut
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userInfo = { email: currentUser?.email };

                const res = await axiosPublic.post('/jwt', userInfo);
                if (res.data?.token) {
                    localStorage.setItem('access-token', res.data?.token);
                }
                setUser(currentUser);

            } else {
                localStorage.removeItem('access-token');
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [axiosPublic]);
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;