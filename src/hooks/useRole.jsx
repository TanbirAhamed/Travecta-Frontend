import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const token = localStorage.getItem('access-token');

    const { data, isLoading } = useQuery({
        queryKey: [user?.email, 'userRole', token],
        enabled: !!user?.email && !!token,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user?.email}`);
            return res.data;
        },
    });

    return {
        isAdmin: data?.admin || false,
        isModerator: data?.moderator || false,
        isLoading
    };
};

export default useRole;