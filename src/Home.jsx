import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

// React functional component named 'Home'
function Home() {
    // React state hook to manage the 'data' array
    const [data, setData] = useState([]);

    // useEffect hook to fetch student data from the server when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, []);

    // Function to handle deletion of a student record by ID
    const handledelete = (id) => {
         axios.delete(`http://localhost:8081/delete/${id}`)
            .then(res => {
           window.location.reload(); // Reload the page after successful deletion
        }).catch(err => console.log(err))
    }

     // JSX structure representing the component's UI
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
                                
                                    <Link to={`/read/${student.ID}`} className='btn btn-sm btn-info' >Read</Link>
                                    {/* <button className='btn btn-sm btn-primary mx-2'>Edit</button> */}
                                    <Link to = {`/edit/${student.ID}`} className="btn btn-sm btn-primary mx-2">Edit</Link>
                                    <button onClick = {() => handledelete(student.ID)} className='btn btn-sm btn-danger'>Delete</button>
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