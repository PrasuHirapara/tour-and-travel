import React, { useState } from 'react';
import  Navbar from '../components/Navbar';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    dob: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    preferredDestinations: '',
    travelFrequency: '',
    budget: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validation = () => {
    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
  
    // Validate first and last name
    if (!formData.firstName || !nameRegex.test(formData.firstName)) {
      alert("First name can't be empty and must contain only letters.");
      return false;
    }
    if (!formData.lastName || !nameRegex.test(formData.lastName)) {
      alert("Last name can't be empty and must contain only letters.");
      return false;
    }
  
    // Validate email
    if (!emailRegex.test(formData.email)) {
      alert("Invalid email format.");
      return false;
    }
  
    // Validate password
    if (!passwordRegex.test(formData.password)) {
      alert("Password must be at least 8 characters long, include a number, an uppercase and a lowercase letter.");
      return false;
    }
  
    // Validate date of birth
    const dobDate = new Date(formData.dob);
    const today = new Date();
    if (isNaN(dobDate) || dobDate >= today) {
      alert("Date of birth must be a past date.");
      return false;
    }
  
    // Validate budget
    if (isNaN(formData.budget) || formData.budget <= 0) {
      alert("Budget must be a positive number.");
      return false;
    }
  
    return true;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!validation()){
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
      // Success handling
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: '',
      dob: '',
      address: '',
      state: '',
      city: '',
      pincode: '',
      preferredDestinations: '',
      travelFrequency: '',
      budget: ''
    });
  };

  return (
    <>
    {/* <Navbar/> */}
    <section className="h-100 bg-dark">
      <div className="container  h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src="https://images.pexels.com/photos/3217911/pexels-photo-3217911.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Sample"
                    className="img-fluid"
                    style={{
                      borderTopLeftRadius: '.25rem',
                      borderBottomLeftRadius: '.25rem'
                    }}
                  />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">Signup Form</h3>

                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="form-control form-control-lg"
                              placeholder="First Name"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              className="form-control form-control-lg"
                              placeholder="Last Name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Email"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Password"
                        />
                      </div>

                      <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                        <h6 className="mb-0 me-4">Gender: </h6>
                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="female"
                            onChange={handleChange}
                            checked={formData.gender === 'female'}
                          />
                          <label className="form-check-label">Female</label>
                        </div>

                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="male"
                            onChange={handleChange}
                            checked={formData.gender === 'male'}
                          />
                          <label className="form-check-label">Male</label>
                        </div>

                        <div className="form-check form-check-inline mb-0">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            value="other"
                            onChange={handleChange}
                            checked={formData.gender === 'other'}
                          />
                          <label className="form-check-label">Other</label>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Date of Birth"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Address"
                        />
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="form-select"
                          >
                            <option value="">Select State</option>
                            <option value="State 1">State 1</option>
                            <option value="State 2">State 2</option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-4">
                          <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="form-select"
                          >
                            <option value="">Select City</option>
                            <option value="City 1">City 1</option>
                            <option value="City 2">City 2</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Pincode"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          name="preferredDestinations"
                          value={formData.preferredDestinations}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Preferred Destinations"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <select
                          name="travelFrequency"
                          value={formData.travelFrequency}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="">Travel Frequency</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Occasionally">Occasionally</option>
                        </select>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="number"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="form-control form-control-lg"
                          placeholder="Budget (in $)"
                        />
                      </div>

                      <div className="d-flex justify-content-end pt-3">
                        <button
                          type="button"
                          onClick={handleReset}
                          className="btn btn-light btn-lg"
                        >
                          Reset all
                        </button>
                        <button
                          type="submit"
                          className="btn btn-warning btn-lg ms-2"
                        >
                          Submit form
                        </button>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Signup;
