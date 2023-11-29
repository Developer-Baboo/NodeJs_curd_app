import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Read() {
    const { id } = useParams();
    const [student, setStudent] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                setStudent(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);  // Include id as a dependency in the useEffect dependency array

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <h2>Student Detail</h2>
                {student.length > 0 ? (
                    <>
                        <h4>{student[0]?.ID}</h4>
                        <h4>{student[0]?.NAME}</h4>
                        <h4>{student[0]?.EMAIL}</h4>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                <Link to="/" className="btn btn-primary me-2">Back</Link>
                <Link to = {`/edit/${student[0]?.ID}`} className="btn btn-primary me-2">Edit</Link>
                {/* <button className="btn btn-info">Edit</button> */}
            </div>
        </div>
    );
}

export default Read;
