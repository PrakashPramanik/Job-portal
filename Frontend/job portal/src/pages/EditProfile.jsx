
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../components/Navbar';
import { Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { setUser } from '../redux/features/authSlice';
import Footer from './Footer';

export default function EditProfile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = new FormData();
    updateData.append('fullName', formData.fullName);
    updateData.append('phoneNumber', formData.phoneNumber);
    if (profileImage) updateData.append('image', profileImage); 
    if (resume) updateData.append('resume', resume); 

    try {
      const res = await axios.put(
        'http://localhost:8000/api/user/updateProfile',
        updateData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      dispatch(setUser(res.data.user));
      navigate('/studentDashboard');
    } catch (error) {
      console.error('Update failed:', error);
      toast.error(error?.response?.data?.message || 'Profile update failed');
    }
  };

  return (
    <>
      <MyNavbar />
      <Container className="mt-5" style={{ maxWidth: '600px',paddingTop: '80px' }}>
        <h3>Edit Profile</h3>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </Form.Group>
{user?.role !== 'recruiter' && (
          <Form.Group className="mb-3">
            <Form.Label>Upload Resume (PDF, DOC)</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
            />
          </Form.Group>
)}
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </Form>
      </Container><br />
      <Footer/>
    </>
  );
}
