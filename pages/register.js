import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      setErrorMessage('');
    }
  }, [formData.password, formData.confirmPassword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      setErrorMessage('');

      try {
        const response = await fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Registration successful, redirect to the login page with the username as a query parameter
          router.push(`/?username=${formData.username}`);
        } else {
          setErrorMessage('Error Request');
        }
      } catch (error) {
        setErrorMessage('Error Server/Connection');
        console.error(error);
      }
    }
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <div className="box p-4">
        <Row>
          <Col md={12}>
            {registrationSuccess ? (
              <p className="text-success">Registration successful!</p>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPasswordConfirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {errorMessage && <p className="text-danger">{errorMessage}</p>}
                </Form.Group>

                <Button className="mt-3 w-100" variant="primary" type="submit">
                  Create
                </Button>

                <p className="mt-3">
                  Already have an account?{' '}
                  <Link href="/">Login</Link>
                </p>
              </Form>
            )}
          </Col>
        </Row>
      </div>
      <style jsx>{`
        .box {
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #fff;
          max-width: 400px;
          width: 100%;
        }

        @media (min-width: 768px) {
          .box {
            max-width: 500px;
          }
        }
      `}</style>
    </Container>
  );
};

export default RegisterPage;
