import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6} className="mb-3 mb-md-0">
            <h5 className="text-uppercase">JobConnect</h5>
            <p className="mb-0">Empowering careers through intelligent connections.</p>
          </Col>

          <Col md={3}>
            <h6 className="text-uppercase">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
              <li><a href="/privacy" className="text-light text-decoration-none">Privacy Policy</a></li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="text-uppercase">Support</h6>
            <ul className="list-unstyled">
              <li><a href="/help" className="text-light text-decoration-none">Help Center</a></li>
              <li><a href="/faq" className="text-light text-decoration-none">FAQ</a></li>
              <li><a href="/terms" className="text-light text-decoration-none">Terms of Service</a></li>
            </ul>
          </Col>
        </Row>

        <hr className="bg-light my-3" />

        <Row>
          <Col className="text-center">
            <small>© {new Date().getFullYear()} JobConnect. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;