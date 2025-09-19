import axios from "axios";
import { useMemo } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    const axiosSecure = useMemo(() => {
        const instance = axios.create({
            baseURL: "http://localhost:5000",
        });

        // Request interceptor to add JWT
        instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("access-token");
                if (token) config.headers.Authorization = `Bearer ${token}`;
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor for auth errors
        instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response?.status;
                if (status === 401 || status === 403) {
                    await logOut();
                    navigate("/login");
                }
                return Promise.reject(error);
            }
        );

        return instance;
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
