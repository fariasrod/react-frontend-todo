import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Link from 'next/link';
import AuthService from '../src/app/services/AuthService';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Check if the 'username' query parameter exists in the URL and set it as the initial value for 'username'
  useEffect(() => {
    const { username: queryUsername } = router.query;
    if (queryUsername) {
      setUsername(queryUsername);
    }
  }, [router.query]);

  const handleSubmit = async () => {
    try {
      const status = await AuthService.login(username, password);
      if (status === 200) {
        router.push('/dashboard');
      } else {
        console.error('Status not expected:', status);
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <div className="box p-4">
        <Row>
          <Col md={12}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  variant="outlined"
                  type="email"
                  name="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  variant="outlined"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <br />
              <Button variant="primary" type="button" onClick={handleSubmit}>
                Login
              </Button>

              <p className="mt-3">
                Don&apos;t have an account?{' '}
                <Link href="/register">Register here</Link>
              </p>
            </Form>
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

export default LoginPage;
