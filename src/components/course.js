import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheet/Course.css'
import { Container, Row, Col, Card, Form, Navbar, Button, ButtonGroup, OverlayTrigger, Popover, Toast } from "react-bootstrap";

export const Course = () => {

  const [course, setCourse] = useState([]);
  const [role, setRole] = useState('');
  const [status, setStatus] = useState(0);
  const [logout, setLogout] = useState(false)
  const [search, setSearch] = useState('')

  // Profile state
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState('')

  useEffect(() => {
    document.title = "Course Management System"
    if (logout) {
      localStorage.clear()
    }
    fetchUser()
    fetchCourse()
  }, [logout]) // [] protected fetch api loop !!!! 

  const fetchCourse = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'))
      await axios.get(`http://localhost:4000/course`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        if (res) setCourse(res.data.course)
      }).catch((error) => {
        if (error) setStatus(error.response.status)
      })
    }
    catch (error) { console.log(error) }
  }

  const fetchUser = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'))
      await axios.get(`http://localhost:4000/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        if (res) {
          console.log(res)
          setFirstname(res.data.firstname)
          setLastname(res.data.lastname)
          setUsername(res.data.username)
          setNickname(res.data.nickname)
          setBirthday(res.data.birthday)
          setGender(res.data.gender)
          setRole(res.data.role)
        }
      }).catch((error) => console.log(error.response.data))
    }
    catch (error) { console.log(error) }
  }

  const popover = (
    <Popover id="popover-basic" className="shadow-sm" style={{ width: '20rem' }}>
      <Toast.Header closeButton={false} ><strong>{`${firstname} ${lastname} (${nickname})`}</strong></Toast.Header>
      <Toast.Body>
        <p>{username}</p>
        <p>{`Birthday : ${birthday}`}</p>
        <p>{`Gender   : ${gender}`}</p>
        <Link to="/profile">
          <div className="d-grid">
            <Button variant="primary">Edit Profile</Button>
          </div>
        </Link>
      </Toast.Body>
    </Popover>
  );

  if (status === 401) return <Redirect to="/" />
  else {
    return (
      <div>
        <Row className="m-0">
          <Col className="col-3 bg-info">
            <div id="sidebar">

              <div className="mt-5 mx-3">
                <Form.Group >
                  <Form.Control
                    placeholder="Search course"
                    value={search}
                    onChange={(event) => {
                      event.preventDefault()
                      setSearch(event.target.value)
                    }}
                  />
                </Form.Group>
                <p className="text-white font-weight-bold">Typing name or start-date course</p>
              </div>

            </div>
          </Col>
          <Col className="col-9">
            <Navbar >
              <Container>
                <Navbar.Brand href="#home">
                  <h2>Course</h2>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text className="text-nowrap">
                    Signed in as: {role}
                  </Navbar.Text>
                  <ButtonGroup className="mx-2">
                    <OverlayTrigger
                      trigger="click"
                      placement={'bottom'}
                      overlay={popover}
                    >
                      <Button variant="outline-primary">Profile</Button>
                    </OverlayTrigger>
                    <Button onClick={() => setLogout(true)} variant="outline-primary">Logout</Button>
                  </ButtonGroup>
                </Navbar.Collapse>
              </Container>
            </Navbar>

            <div className="m-4 mt-0">
              {course.filter((res) =>
                res.name.toLowerCase().includes(search.toLowerCase()) ||
                res.starttime.includes(search)
              )  // Serach fillter
                .map(res => {
                  return (
                    <Card className="mb-3 shadow-sm" key={res.id}>
                      <Card.Body>
                        <Card.Title>{res.name}</Card.Title>
                        <Card.Subtitle className="mt-2 text-muted">Description</Card.Subtitle>
                        <Card.Text className="mt-2 overflow-hidden">{res.description}</Card.Text>
                        <Row className="d-flex flex-wrap">
                          <Col className="col-lg-2 text-nowrap"><Card.Text>{`Start : ${res.starttime}`}</Card.Text></Col>
                          <Col className="col-lg-10 text-nowrap"><Card.Text>{`End : ${res.endtime}`}</Card.Text></Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  )
                })}

              {role === 'instructor' ?
                <Link className="text-decoration-none" to="/create">
                  <Card className="d-grid shadow-sm">
                    <Button variant="Light" size="">Create</Button>
                  </Card>
                </Link>
                :
                <Card className="d-grid shadow-sm">
                  <Button variant="Light" disabled>Create</Button>
                </Card>
              }

            </div>
          </Col>
        </Row>
      </div >
    );
  }
}