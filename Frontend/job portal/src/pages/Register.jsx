import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyNavbar from '../components/Navbar';
import { Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Footer from './Footer';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
    });

     const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
    form.append('fullName', formData.fullName);
    form.append('email', formData.email);
    form.append('phoneNumber', formData.phoneNumber);
    form.append('password', formData.password);
    form.append('role', formData.role);
    if (image) {
      form.append('image', image);
    }
        try {
            const res = await axios.post(
                'http://localhost:8000/api/user/register',
                form,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );


            toast.success(res.data.message);

            setTimeout(() => navigate('/login'), 2000);

        } catch (error) {


            const message = error?.response?.data?.message;

            if (message) {
                toast.error(message);
            } else {
                console.error(
                    'Registration failed:',
                    error?.response?.data || error.message
                );
            }
        }

    };

    return (
        <>
            <MyNavbar /><br /><br />
            <Container className="mt-5" style={{ maxWidth: '600px' }}>
                <div
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        padding: '30px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)'
                    }}
                >
                    <h2 className="mb-4">Register</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formFullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"

                                onChange={handleChange}
                                required
                                placeholder="Enter your full name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"

                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                onChange={handleChange}
                                required
                                placeholder="Enter your phone number"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                name="role"
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="student">Student</option>
                                <option value="recruiter">Recruiter</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                            />
                        </Form.Group>

                         <Form.Group className="mb-4">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </div>
            </Container><br />
            <Footer/>
        </>
    );
};

export default Register;
