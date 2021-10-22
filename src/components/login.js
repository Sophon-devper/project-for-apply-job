import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, Link } from 'react-router-dom'
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap'
import axios from 'axios';

export const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [pass, setPass] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState([])

  const req = {
    username: username,
    password: password
  }

  useEffect(() => {
    document.title = "Login - Course Management System"
  },[])

  const login = async () => {
    try {
      await axios.post('http://localhost:4000/user/login', req).then((res) => {    // save token to local storage
        if (res) {
          localStorage.setItem('token', JSON.stringify(res.data.access_token))   // Do not is real product !!
          setPass(true)
          setError(false)
        }
      }).catch((error) => {
        if (error) {
          setError(true)
          setMessage(error.response.data.error.message)
        }
      })
    }catch(error){console.log(error)}
  }

  if (pass) return <Redirect to="/course" />
  else {
    return (
      <div>
        <h2 className="text-center mt-5">Course Management System</h2>
        <div className="mt-5" style={{ width: '25rem', margin: 'auto' }}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="text-center">login</h3>

              {error ? <div className="alert alert-danger mt-4" role="alert">{message}</div> : null}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="email"
                  value={username}
                  onChange={(event) => {
                    event.preventDefault()
                    setUsername(event.target.value)
                  }}
                  placeholder="Username" />
                <Form.Text className="text-muted">
                  Username must be an email.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(event) => {
                    event.preventDefault()
                    setPassword(event.target.value)
                  }}
                  placeholder="Password" />
              </Form.Group>

              <Container className="mt-4">
                <Row>
                  <Col>
                    <div className="d-grid">
                      <Button onClick={login} variant="primary">Login</Button>
                    </div>
                  </Col>
                  <Col>
                    <Link className="text-decoration-none" to="/register">
                      <div className="d-grid">
                        <Button variant="secondary">Sign up</Button>
                      </div>
                    </Link>
                  </Col>
                </Row>
              </Container>

            </Card.Body>
          </Card>

        </div>
      </div >
    );
  }
}