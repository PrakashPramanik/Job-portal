import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyNavbar from '../components/Navbar';
import { Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/authSlice";
import Footer from './Footer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:8000/api/user/login',
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      const { user, message } = res.data;
      dispatch(setUser(user));

      toast.success(`Welcome back, ${user.fullName || 'User'}!`);

      if (user.role === 'student') {
        navigate('/studentDashboard');
      } else if (user.role === 'recruiter') {
        navigate('/recruiterDashboard');
      } else {
        toast.error("Unknown role");
      }

    } catch (error) {
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
      console.error("Login Error:", error?.response?.data || error.message);
    }
  };

  return (
    <>
      <MyNavbar />
      <Container className="mt-5" style={{ maxWidth: '500px',paddingTop: '80px' }}>
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '30px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)'
          }}
        >
          <h2 className="mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="recruiter">Recruiter</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </div>
      </Container><br />
      <Footer/>
     
    </>
  );
};

export default Login;
