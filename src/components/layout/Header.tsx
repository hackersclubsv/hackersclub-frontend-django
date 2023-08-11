import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/authSlice';
import { toast } from 'react-toastify';

const Header = () => {
  
  const { userInfo } = useSelector((state : any) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logoutHandler = async () => {
    dispatch(logout({}));
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <header>
      <Navbar expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>SV Hackers Club</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
                <LinkContainer to='/'>
                    <Nav.Link>
                      Home
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/resources'>
                    <Nav.Link>
                      Resources
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/community'>
                    <Nav.Link>
                      Community
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/about'>
                    <Nav.Link>
                      About
                    </Nav.Link>
                  </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.username} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header