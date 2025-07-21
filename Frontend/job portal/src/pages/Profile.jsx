import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Container, Row, Col, Badge } from 'react-bootstrap';
import MyNavbar from '../components/Navbar';
import Footer from './Footer';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <MyNavbar />
      <Container className="mt-5 d-flex justify-content-center" style={{ paddingTop: '80px' }}>
        <Card
          style={{ width: '500px', borderRadius: '20px' }}
          className="p-4 shadow-lg bg-light"
        >
          <div className="text-center mb-4">
            <img
              src={user?.profileImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s'}
              alt="Profile"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '4px solid #0d6efd',
              }}
            />
          </div>
          <h4 className="text-center mb-2 fw-bold text-primary">
            {user?.fullName}
          </h4>
          <p className="text-center mb-4">
            <Badge bg="secondary" className="px-3 py-2">{user?.role}</Badge>
          </p>

          <Row className="mb-2">
            <Col xs={4} className="fw-semibold text-muted">Email:</Col>
            <Col>{user?.email}</Col>
          </Row>

          <Row className="mb-2">
            <Col xs={4} className="fw-semibold text-muted">Phone:</Col>
            <Col>{user?.phoneNumber}</Col>
          </Row>

          <Row className="mb-2">
            <Col xs={4} className="fw-semibold text-muted">Role:</Col>
            <Col className="text-capitalize">{user?.role}</Col>
          </Row>

          {user?.resume && (
            <Row className="mt-4">
              <Col className="text-center">
                <a
                  href={user.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >
                  Preview / Download Resume
                </a>
              </Col>
            </Row>
          )}
        </Card>
      </Container><br />
      <Footer/>
    </>
  );
};

export default Profile;
