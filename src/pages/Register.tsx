import { useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/common/FormContainer';
import Loader from '../components/layout/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const registerSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'Too short.')
      .max(20, 'Too long.')
      .required('Required.'),
    email: Yup.string().email('Invalid email.').required('Required'),
    password: Yup.string()
      .min(8, 'Too short.')
      .max(20, 'Too long.')
      .required('Required.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match.')
      .required('Required.'),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (values: typeof initialValues) => {

    const submitValues = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    console.log(submitValues);
    try {
      const res = await register(submitValues).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate('/');
      toast.success('Registered successfully');
    } catch (err: any) {
      err.data.username && toast.error(err.data.username[0]);
      err.data.email && toast.error(err.data.email[0]);
      err.data.password && toast.error(err.data.password[0]);
      err.data.bio && toast.error(err.data.bio[0]);
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Formik
        validationSchema={registerSchema}
        // onSubmit={submitHandler}
        onSubmit={
          (values, actions) => {
            setTimeout(() => {
              submitHandler(values);
              actions.setSubmitting(false);
            }, 1000);
          }
        }
        initialValues={initialValues}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur
        }) => (
          <Form>
            <p>
              <em className="text-red">*</em> is required.
            </p>
            <Form.Group className="my-2" controlId="username">
              <Form.Label>
                Username<em className="text-red">*</em>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                isInvalid={!!errors.username}
                required
              ></Form.Control>
              {errors.username && touched.username && (
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>
                Email Address<em className="text-red">*</em>
              </Form.Label>
              <p>Please use your northeastern.edu email address.</p>
              <Form.Control
                type="email"
                placeholder="Enter email"
                autoComplete="off"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                isInvalid={!!errors.email}
                required
              ></Form.Control>
              {errors.email && touched.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label>
                Password<em className="text-red">*</em>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                isInvalid={!!errors.password}
                required
              ></Form.Control>
              {errors.password && touched.password && (
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="my-2" controlId="confirmPassword">
              <Form.Label>
                Confirm Password<em className="text-red">*</em>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                isInvalid={!!errors.confirmPassword}
                required
              ></Form.Control>
              {errors.confirmPassword && touched.confirmPassword && (
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="my-2" controlId="tandc">
              <Form.Check
                type="checkbox"
                label="I agree to the Terms and Conditions"
                required
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Register
            </Button>

            {isLoading && <Loader />}
          </Form>
        )}
      </Formik>

      <Row className="py-3">
        <Col>
          Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
