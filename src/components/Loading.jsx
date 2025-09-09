import React from 'react';
import { Grid } from 'ldrs/react'
import 'ldrs/react/Grid.css'


const Loading = () => {
    return (
        <div className="flex min-h-screen justify-center items-center">
            <Grid
                size="60"
                speed="1.5"
                color="black"
            />
        </div>
    );
};

export default Loading;