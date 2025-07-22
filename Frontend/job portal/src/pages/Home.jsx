import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../components/Navbar';
import Footer from './Footer';
import Cookies from 'js-cookie';

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    location: [],
    type: [],
    salary: [],
    title: []
  });

  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/job', {
        withCredentials: true,
      });

      if (Array.isArray(res.data)) {
        setJobs(res.data);
        setFilteredJobs(res.data);
      } else {
        console.error('Unexpected data format:', res.data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => {
      const categoryList = prev[category];
      return {
        ...prev,
        [category]: categoryList.includes(value)
          ? categoryList.filter((v) => v !== value)
          : [...categoryList, value],
      };
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

 


  const applyFilters = () => {
    let result = [...jobs];

    if (filters.location.length)
      result = result.filter((job) => filters.location.includes(job.location));

    if (filters.type.length)
      result = result.filter((job) => filters.type.includes(job.type));

    if (filters.salary.length) {
      result = result.filter((job) => {
        const salary = parseFloat(job.salaryRange);
        return filters.salary.some((range) => {
          if (range === '3-5') return salary >= 3 && salary <= 5;
          if (range === '>5') return salary > 5;
          return false;
        });
      });
    }

    if (filters.title.length)
      result = result.filter((job) => filters.title.includes(job.title));


    if (search)
      result = result.filter((job) =>
        job.companyName?.toLowerCase().includes(search.toLowerCase())
      );

    setFilteredJobs(result);
  };

  const handleApply = (jobId) => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
    } else {
      navigate(`/apply/${jobId}`);
    }
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const locations = [...new Set(jobs.map((job) => job.location))];
  const types = [...new Set(jobs.map((job) => job.type))];

  return (
    <>
      <MyNavbar /><br /><br /><br />
      <Container fluid>
        {/* Carousel */}
        <div className="carousel-text bg-success text-white text-center py-3">
          <marquee scrollamount="10">
            Find your dream job at top companies • Apply easily • Filter by Location, Salary, Type & Category!
          </marquee>
        </div>

        <Row>
          {/* Sidebar */}
          <Col md={3} className="bg-light p-3" style={{ height: '100vh', position: 'sticky', top: 0, overflowY: 'auto' }}>
            <h4>Filter Jobs</h4>

            <Form.Control
              type="text"
              placeholder="Search company..."
              value={search}
              onChange={handleSearchChange}
              className="mb-3"
            />

            <h6>📍 Location</h6>
            {locations.map((loc, idx) => (
              <Form.Check
                key={idx}
                type="checkbox"
                label={loc}
                onChange={() => handleCheckboxChange('location', loc)}
              />
            ))}

            <hr />

            <h6>💼 Type</h6>
            {types.map((type, idx) => (
              <Form.Check
                key={idx}
                type="checkbox"
                label={type}
                onChange={() => handleCheckboxChange('type', type)}
              />
            ))}

            <hr />

            <h6>💰 Salary (LPA)</h6>
            <Form.Check
              type="checkbox"
              label="3LPA - 5LPA"
              onChange={() => handleCheckboxChange('salary', '3-5')}
            />
            <Form.Check
              type="checkbox"
              label="> 5LPA"
              onChange={() => handleCheckboxChange('salary', '>5')}
            />

            <hr />
            <h6>🏷️ Category (Title)</h6>
            {[...new Set(jobs.map((job) => job.title))].map((title, idx) => (
              <Form.Check
                key={idx}
                type="checkbox"
                label={title}
                onChange={() => handleCheckboxChange('title', title)}
              />
            ))}


            <Button variant="primary" className="mt-3 w-100" onClick={applyFilters}>
              ✅ Apply Filters
            </Button>
           
          </Col>




          {/* Job Listings */}
          <Col md={9} className="p-4">
            <h3 className="mb-4">🔥 Available Jobs</h3>
            <Row>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Col md={6} lg={4} key={job._id} className="mb-4">
                    <Card>
                      <Card.Body>
                        <Card.Title>{job.title}</Card.Title>
                        <Card.Text>
                          <strong>Company:</strong> {job.companyName || 'N/A'} <br />
                          <strong>Location:</strong> {job.location || 'N/A'} <br />
                          <strong>Type:</strong> {job.type || 'N/A'} <br />
                          <strong>Salary:</strong> ₹{job.salaryRange} <br />
                          <strong>Description:</strong>{' '}
                          <span className="text-muted">
                            {job.description?.slice(0, 100) || 'N/A'}...
                          </span> <br />
                          <strong>Posted on:</strong> {new Date(job.createdAt).toLocaleString()} <br />
                          <strong>Posted By:</strong> {job.createdBy?.fullName} <br />

                        </Card.Text>
                        <div className="d-flex gap-2">
                          <Button variant="success" className="w-100" onClick={() => handleApply(job._id)}>
                            ✅ Apply
                          </Button>
                          <Button variant="info" className="w-100" onClick={() => handleViewDetails(job)}>
                            🔍 View Details
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col>
                  <p>No jobs found with selected filters.</p>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Job Details Modal */}
      {selectedJob && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedJob.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Company:</strong> {selectedJob.companyName}</p>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Type:</strong> {selectedJob.type}</p>
            <p><strong>Salary:</strong> ₹{selectedJob.salaryRange} </p>
            <p><strong>Description:</strong> {selectedJob.description}</p>
            <p><strong>Posted on:</strong> {new Date(selectedJob.createdAt).toLocaleString()}</p>
            <p><strong>Posted By:</strong> {selectedJob.createdBy?.fullName}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Footer />
    </>
  );
};

export default JobPage;
