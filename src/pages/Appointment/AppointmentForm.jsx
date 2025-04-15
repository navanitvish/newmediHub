import React, { useState, useEffect } from 'react';
import {  createAppointment } from '../../api/apiCall';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    type: "General Checkup",
    age: "",
    gender: "",
    problem: "",
    problemDescription: "",
    referral: "",
    labs: "",
    appointmentDate: "",
    commission: "",
    healthProblem: "",
    address: {
      address: "",
      city: "",
      state: "",
      pinCode: ""
    },
    locationAddress: "",
    visitType: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Post appointment data to the API
      const response = await createAppointment(formData);
      
      console.log("Appointment created:", response);
      setSuccess(true);
      setLoading(false);
      
      // Reset form after successful submission
      setFormData({
        type: "General Checkup",
        age: "",
        gender: "",
        problem: "",
        problemDescription: "",
        referral: "",
        labs: "",
        appointmentDate: "",
        commission: "",
        healthProblem: "",
        address: {
          address: "",
          city: "",
          state: "",
          pinCode: ""
        },
        locationAddress: "",
        visitType: ""
      });
    } catch (err) {
      setError("Failed to schedule appointment. Please try again.");
      setLoading(false);
      console.error("Error creating appointment:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Schedule an Appointment</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Appointment scheduled successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Appointment Type</label>
          <select 
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="General Checkup">General Checkup</option>
            <option value="Specialist Consultation">Specialist Consultation</option>
            <option value="Follow-up">Follow-up</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Gender</label>
            <select 
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Primary Health Concern</label>
          <input
            type="text"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Problem Description</label>
          <textarea
            name="problemDescription"
            value={formData.problemDescription}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Appointment Date & Time</label>
          <input
            type="datetime-local"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Visit Type</label>
          <select 
            name="visitType"
            value={formData.visitType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select</option>
            <option value="in-person">In-person</option>
            <option value="telehealth">Telehealth</option>
          </select>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">Address Information</h3>
          <div className="p-3 border border-gray-200 rounded">
            <div className="mb-3">
              <label className="block text-gray-700 text-sm mb-1">Street Address</label>
              <input
                type="text"
                name="address.address"
                value={formData.address.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-gray-700 text-sm mb-1">City</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">State</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Pin Code</label>
              <input
                type="text"
                name="address.pinCode"
                value={formData.address.pinCode}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Scheduling..." : "Schedule Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;