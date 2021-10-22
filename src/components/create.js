import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router-dom'
import { Card, Form, Button, FloatingLabel, Row, Col } from 'react-bootstrap'

export const Create = () => {

  const [coursename, setCoursename] = useState('')
  const [description, setDescription] = useState('')
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState('')
  const [startdate, setStartdate] = useState('')
  const [enddate, setEnddate] = useState('')
  const [amount, setAmount] = useState('')
  const [pass, setPass] = useState(false)
  const [error, setError] = useState(0);
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(0);

  useEffect(() => {
    document.title = "Create course - Course Management System"
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'))
      await axios.get(`http://localhost:4000/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).catch((error) => {
        if (error) setStatus(error.response.status)
      })
    }
    catch (error) { console.log(error) }
  }


  const newCourse = {
    name: coursename,
    description: description,
    category: category,
    subject: subject,
    starttime: startdate,
    endtime: enddate,
    amount: amount
  }

  const save = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'))
      await axios.post(`http://localhost:4000/course/create`, newCourse, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        if (res) {
          setPass(true)
          setError(false)
        }
      }).catch((error) => {
        if (error) {
          setError(true)
          setMessage(error.response.data.error.message)
        }
      })
    }
    catch (error) { console.log(error) }
  }

  if (pass) return <Redirect to="/course" />
  else if (status === 401) return <Redirect to="/" />
  else {
    return (
      <div>
        <h2 className="text-center mt-5">Course Management System</h2>
        <div className="mt-5" style={{ width: '40rem', margin: 'auto' }}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="text-center">Create your course</h3>

              {error ? <div className="alert alert-danger mt-4" role="alert">{message}</div> : null}

              <Form.Group className="mb-3">
                <Form.Label>Course name</Form.Label>
                <Form.Control
                  type="text"
                  value={coursename}
                  onChange={(event) => {
                    event.preventDefault()
                    setCoursename(event.target.value)
                  }}
                />
              </Form.Group>

              <Form.Label>Description</Form.Label>
              <FloatingLabel className="mb-3" controlId="floatingTextarea" >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '100px' }}
                  value={description}
                  onChange={(event) => {
                    event.preventDefault()
                    setDescription(event.target.value)
                  }}
                />
              </FloatingLabel>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      value={subject}
                      onChange={(event) => {
                        event.preventDefault()
                        setSubject(event.target.value)
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      value={category}
                      onChange={(event) => {
                        event.preventDefault()
                        setCategory(event.target.value)
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Start</Form.Label>
                    <Form.Control
                      type='date'
                      format='dd/mm/yyyy'
                      startdate={new Date()}
                      value={startdate}
                      onChange={(event) => {
                        event.preventDefault()
                        setStartdate(event.target.value)
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>End</Form.Label>
                    <Form.Control
                      type='date'
                      value={enddate}
                      format="dd/mm/yyyy"
                      onChange={(event) => {
                        event.preventDefault()
                        setEnddate(event.target.value)
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Student amount</Form.Label>
                <Form.Control
                  type='number'
                  min='0'
                  value={amount}
                  onChange={(event) => {
                    event.preventDefault()
                    setAmount(event.target.value)
                  }}
                />
              </Form.Group>

              <div className="mt-4 text-center">
                <div className="d-grid">
                  <Button onClick={save} variant="primary" size="lg">Save</Button>
                </div>
              </div>

            </Card.Body>
          </Card>
        </div>
      </div >
    );
  }
}
