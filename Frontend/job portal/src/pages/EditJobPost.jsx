import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import MyNavbar from '../components/Navbar';
import Footer from './Footer';

const EditJobPost = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    type: 'Full-Time',
    salaryRange: '',
    companyName: ''
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/job/${jobId}`);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          location: res.data.location,
          type: res.data.type,
          salaryRange: res.data.salaryRange,
          companyName: res.data.companyName || ''
        });
      } catch (error) {
        console.error('Failed to fetch job:', error);
        toast.error('Failed to fetch job details');
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/job/${jobId}`, formData, {
        withCredentials: true,
      });
      toast.success('Job updated successfully!');
      navigate('/recruiterDashboard');
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job');
    }
  };

  return (
    <>
      <MyNavbar />
      <Container style={{ paddingTop: '100px', maxWidth: '700px' }}>
        <Card className="shadow-lg border-0 p-4">
          <h3 className="text-center text-primary mb-4">📝 Edit Job Post</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Job Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter job title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the job role..."
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter job location"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Job Type</Form.Label>
              <Form.Select name="type" value={formData.type} onChange={handleChange}>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Salary Range (in LPA)</Form.Label>
              <Form.Control
                type="text"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
                placeholder="e.g. 6-10"
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="success" size="lg" type="submit">
                Update Job
              </Button>
            </div>
          </Form>
        </Card>
      </Container><br />
      <Footer/>
    </>
  );
};

export default EditJobPost;
