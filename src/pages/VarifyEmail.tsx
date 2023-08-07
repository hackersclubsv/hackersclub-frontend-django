import { Container, Card, Form, Button } from 'react-bootstrap'

const VarifyEmail = () => {
  return (
    <Container className='my-5'>
      <h2 className='my-5'>Varify Email</h2>
      <Card>
        <Card.Body>
          <Card.Title>Please Varify Your Email</Card.Title>
          <Card.Text>
            <p>A varification email has been sent to your email address.<br />
            Please enter the code in the email to varify your account.</p>
          </Card.Text>
          <Form>
          <Form.Group className="my-2" controlId="code">
            <Form.Label>
              Code<em className="text-red">*</em>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter code"
              name="code"
              // onChange={handleChange}
              // onBlur={handleBlur}
              // value={values.code}
              // isInvalid={!!errors.code}
              required
            ></Form.Control>
            {/* {errors.code && touched.code && (
              <Form.Control.Feedback type="invalid">
                {errors.code}
              </Form.Control.Feedback>
            )} */}
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Varify
          </Button>

          </Form>

        </Card.Body>
      </Card>
    </Container>
  )
}

export default VarifyEmail