import { Navbar, Container, Nav, Dropdown, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/features/authSlice';
import { toast } from 'react-toastify';

const MyNavbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/user/logout', {}, {
        withCredentials: true,
      });
      dispatch(setUser(null));
      toast.success("Logout successful");
      navigate('/login');
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm" fixed="top">
      <Container>
        <Navbar.Brand
          onClick={() => {
            if (user?.role === 'student') {
              navigate('/studentDashboard');
            } else if (user?.role === 'recruiter') {
              navigate('/recruiterDashboard');
            } else {
              navigate('/');
            }
          }}
          style={{ cursor: 'pointer' }}
          className="text-white fw-bold"
        >
          JobPortal
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            {user ? (
              <>
                <span className="text-white me-2">Welcome, {user.fullName}</span>
                <span className="text-white mx-2" style={{ borderLeft: '1px solid white', height: '24px' }}></span>


                <Nav.Link
                  className="text-white"
                  onClick={() => {
                    if (user?.role === 'student') {
                      navigate('/studentDashboard');
                    } else if (user?.role === 'recruiter') {
                      navigate('/recruiterDashboard');
                    }
                  }}
                >
                  Dashboard
                </Nav.Link>


                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    className="p-0 border-0 bg-transparent d-flex align-items-center"
                    style={{ textDecoration: 'none' }}
                  >
                    <Image
                      src={user.profileImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s'}
                      roundedCircle
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'cover',
                      }}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate('/profile')}>Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => navigate('/edit-profile')}>Edit Profile</Dropdown.Item>
                    <Dropdown.Divider />

                    {user.role === 'recruiter' && (
                      <>

                        <Dropdown.Item onClick={() => navigate('/post-job')}>Post Job</Dropdown.Item>
                        <Dropdown.Divider />
                      </>
                    )}



                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
