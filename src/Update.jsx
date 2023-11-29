import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


// React functional component named 'Update'
function Update() {
  // Extracting 'id' from the route parameters
  const { id } = useParams();
  // React hook for navigating to different routes
  const navigate = useNavigate();
  // React state hook to manage the 'student' object
  const [student, setStudent] = useState({});

// React state hook to manage form input values
  const [values, setValues] = useState({
    name: '',
    email: '',
  });

  // useEffect hook to fetch student data from the server when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:8081/read/${id}`)
      .then(res => {
        console.log(res);
        setStudent(res.data[0]);
      })
      .catch(err => console.log(err));
  }, [id]);

  // useEffect hook to update form input values when 'student' changes
  useEffect(() => {
    // Update values when student changes
    setValues({
      name: student.NAME || '',
      email: student.EMAIL || '',
    });
  }, [student]);

   // Event handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Event handler for form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Sending a PUT request to update student data
    axios.put('http://localhost:8081/update/' + id, values)
    .then(res => {
      console.log(res)
       // Navigating back to the home page after successful update
      navigate('/')
    }).catch(err => console.log(err));
  };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleFormSubmit}>
          <h2>Update Student Data</h2>
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              placeholder='Enter Name'
              className='form-control'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Enter Email'
              className='form-control'
              name='email'
              value={values.email}
              onChange={handleInputChange}
            />
          </div>
          <button type='submit' className='btn btn-success'>
            Update
          </button>
          <Link to="/" className="btn btn-primary me-2">Back</Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
