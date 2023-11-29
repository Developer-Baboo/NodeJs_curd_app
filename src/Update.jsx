import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Update() {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [values, setValues] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:8081/read/${id}`)
      .then(res => {
        console.log(res);
        setStudent(res.data[0]);
      })
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    // Update values when student changes
    setValues({
      name: student.NAME || '',
      email: student.EMAIL || '',
    });
  }, [student]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement logic to update student data using axios or another method
    console.log('Form submitted with values:', values);
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
