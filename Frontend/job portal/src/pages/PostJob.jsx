
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import MyNavbar from '../components/Navbar';
import Footer from './Footer';

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: 'Full-Time', // default
    salaryRange: '',
    companyName: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8000/api/job/create',
        formData,
        { withCredentials: true } 
      );
      toast.success('Job posted successfully!');
      setFormData({
        title: '',
        description: '',
        location: '',
        type: 'Full-Time',
        salaryRange: '',
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post job.');
    }
  };

  return (
    <>
    <MyNavbar /><br /><br />
    <div className="container mt-4">
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} className="form-control mb-2" />
        <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleChange} className="form-control mb-2" />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="form-control mb-2" />

        <select name="type" value={formData.type} onChange={handleChange} className="form-control mb-2">
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>

        <input name="salaryRange" placeholder="Salary Range (e.g. 5-8 LPA)" value={formData.salaryRange} onChange={handleChange} className="form-control mb-2" />

        <button type="submit" className="btn btn-primary">Post Job</button>
      </form>
    </div><br />
    <Footer/>
    </>
  );
}
