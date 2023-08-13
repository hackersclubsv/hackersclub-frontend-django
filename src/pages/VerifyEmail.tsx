import { Button, Card, Container, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    verifyCode(code);
  };

  const verifyCode = async (code: string) => {
    try {
      const email = localStorage.getItem("email");
      const response = await axios.post(
        "http://localhost:8000/api/register/verify_email/",
        {
          email,
          otp: code,
        },
      );

      toast.success("Email verified successfully");
      localStorage.removeItem("email");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container className="my-5">
      <h2 className="my-5">Verify Email</h2>
      <Card>
        <Card.Body>
          <Card.Title>Please Verify Your Email</Card.Title>
          <Card.Text>
            <p>
              A verification email has been sent to your email address.
              <br />
              Please enter the code in the email to verify your account.
            </p>
          </Card.Text>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2" controlId="code">
              <Form.Label>
                Code<em className="text-red">*</em>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter code"
                name="code"
                onChange={(event) => setCode(event.target.value)}
                value={code}
                required
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Verify
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default VerifyEmail;
