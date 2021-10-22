import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Form, Button, Col, Row } from 'react-bootstrap'
import axios from 'axios';

export const Register = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [nickname, setNickname] = useState('')
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState('male')
  const [role, setRole] = useState('student')
  const [error, setError] = useState(false)
  const [message, setMessage] = useState([])
  const [isSignup, setSignup] = useState(false)

  
  useEffect(() => {
    document.title = "Sign up - Course Management System"
  },[])

  const information = {
    username: username,
    password: password,
    firstname: firstname,
    lastname: lastname,
    nickname: nickname,
    birthday: birthday,
    gender: gender,
    role: role
  }

  const onRegister = async (event) => {
    try{
    await axios.post('http://localhost:4000/user/register', information)
      .then((res) => {
        if (res) {
          setError(false)
          setSignup(true)
        }
      })
      .catch((error) => {
        if (error) {
          setError(true)
          setMessage(error.response.data.error.message)
        }
      })
    }catch(error){console.log(error)}
  }

  if (isSignup) return <Redirect to="/" />
  else {
    return (
      <div>
        <h2 className="text-center mt-5">Course Management System</h2>
        <div className="mt-5" style={{ width: '26rem', margin: 'auto' }}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="text-center">Sign up</h3>

              {error ? <div className="alert alert-danger mt-4" role="alert">{message}</div> : null}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => {
                    event.preventDefault()
                    setUsername(event.target.value)
                  }}
                />
                <Form.Text className="text-muted">
                  Username must be an email
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    event.preventDefault()
                    setPassword(event.target.value)
                  }}
                />
                <Form.Text className="text-muted">
                  Password of at least 10 characters.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Firstname"
                  value={firstname}
                  onChange={(event) => {
                    event.preventDefault()
                    setFirstname(event.target.value)
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Lastname"
                  value={lastname}
                  onChange={(event) => {
                    event.preventDefault()
                    setLastname(event.target.value)
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>nickname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="nickname"
                  value={nickname}
                  onChange={(event) => {
                    event.preventDefault()
                    setNickname(event.target.value)
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(event) => {
                    event.preventDefault()
                    setBirthday(event.target.value)
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Row>
                  <Col>
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      size="sm"
                      value={gender}
                      onChange={(event) => {
                        event.preventDefault()
                        setGender(event.target.value)
                      }}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Label>Role</Form.Label>
                    <Form.Select
                      size="sm"
                      value={role}
                      onChange={(event) => {
                        event.preventDefault()
                        setRole(event.target.value)
                      }}
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>

              <div className="mt-4 text-center">
                <div className="d-grid">
                  <Button onClick={onRegister} variant="primary" size="lg">Sign up</Button>
                </div>
              </div>

            </Card.Body>
          </Card>
        </div>
      </div >
    );
  }
}