import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Student List</h2>
                <div className='d-flex justify-content-end'>
                        <Link to="/create" className="btn btn-success">Create+</Link>
                </div>
                <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student, index) =>{
                            return <tr key={index}>
                                <td>{student.ID}</td>
                                <td>{student.NAME}</td>
                                <td>{student.EMAIL}</td>
                                <td>
                                {/* btn btn-sm btn-danger*/}
                                
                                    <Link to={`/read/${student.id}`} className='btn btn-sm btn-info' >Read</Link>
                                    <button className='btn btn-sm btn-primary mx-2'>Edit</button>
                                    <button className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                    })}
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;