import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Read() {
    const { id } = useParams();
    const [student, setStudent] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/read/'+id)
            .then(res => {
                console.log(res)
                setStudent(res.data);
            })
        .catch(err => console.log(err))
    }, [])
  return (
      <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
          <div className='w-50 bg-white rounded p-3'>
                <h2>Student Detail</h2>
              <h4> Id:  {student[0].ID}</h4>
              <h4> Name: {student[0].NAME}</h4>
              <h4>Email: {student[0].EMAIL}</h4>
                <Link to="/" className="btn btn-primary me-2">Back</Link>
                <button className="btn btn-info">Edit</button>
            </div>
    </div>
  )
}

export default Read