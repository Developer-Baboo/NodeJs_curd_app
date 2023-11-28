import React, { useEffect } from 'react';
import axios from 'axios';

function Home() {
    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }, []);
    return (
        <div></div>
    )
}

export default Home;