
import { useEffect, useState } from 'react';
import axios from 'axios';
import MyNavbar from '../components/Navbar';
import { Card, Button, Container, Row, Col, Toast } from 'react-bootstrap';
import Footer from './Footer';

export default function StudentDashboard() {
  const [jobs, setJobs] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/job', {
        withCredentials: true,
      });

      if (Array.isArray(res.data)) {
        setJobs(res.data);
      } else {
        console.error('Unexpected data format:', res.data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const [appliedJobs, setAppliedJobs] = useState([]);

const handleApply = (jobId) => {
  if (!appliedJobs.includes(jobId)) {
    setAppliedJobs(prev => [...prev, jobId]);
    setToast({ show: true, message: '✅ Applied Successfully!' });
  }
};


  return (
    <>
      <MyNavbar />
      <Container ><br /><br /><br /><br />
        <h2 className="text-center mb-5">🎓 Student Job Dashboard</h2>
        <Row className="g-4">
          {jobs.map((job) => (
            <Col md={6} lg={4} key={job._id}>
              <Card className="h-100 shadow-sm border-0 d-flex flex-column">
                <Card.Body className="d-flex flex-column">
                  <div className="mb-3">
                    <Card.Title className="text-primary fw-bold">{job.title}</Card.Title>
                    <Card.Subtitle className="text-muted mb-2">
                      Posted by: <strong>{job.createdBy?.fullName || 'Unknown'}</strong>
                    </Card.Subtitle>
                  </div>

                  <Card.Text className="flex-grow-1 text-sm">
                    <strong>Company:</strong> {job.companyName || 'N/A'} <br />
                    <strong>Location:</strong> {job.location || 'N/A'} <br />
                    <strong>Type:</strong> {job.type || 'N/A'} <br />
                    <strong>Salary:</strong> ₹{job.salaryRange} <br />
                    <strong>Description:</strong> <span className="text-muted">{job.description?.slice(0, 100) || 'N/A'}...</span>
                  </Card.Text>

                  <div className="mt-3">
                    <Button
                      variant="success"
                      onClick={() => handleApply(job._id)}
                      className="w-100"
                      disabled={appliedJobs.includes(job._id)}
                    >
                      {appliedJobs.includes(job._id) ? '✅ Applied' : '✅ Apply'}
                    </Button>

                  </div>
                </Card.Body>
                <Card.Footer className="text-muted small text-center">
                  Posted on: {new Date(job.createdAt).toLocaleString()}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <br /><br />
      <Footer />

      {/* Toast Message */}
      <Toast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          backgroundColor: '#28a745',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
        }}
      >
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>
    </>
  );
}
