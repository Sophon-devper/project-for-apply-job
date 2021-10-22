import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Form, Button, Col, Row } from 'react-bootstrap'
import axios from 'axios';

export const Profile = () => {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [nickname, setNickname] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('male')
    const [role, setRole] = useState('student')
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState(0);
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => {
        document.title = "Update profile - Course Management System"
        fetchUser()
    }, [])

    const dataUpdate = {
        firstname: firstname,
        lastname: lastname,
        nickname: nickname,
        birthday: birthday,
        gender: gender,
        role: role
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
                    setFirstname(res.data.firstname)
                    setLastname(res.data.lastname)
                    setNickname(res.data.nickname)
                    setBirthday(dateTranform(res.data.birthday))
                    setGender(res.data.gender)
                    setRole(res.data.role)
                }
            }).catch((error) => {
                if (error) setStatus(error.response.status)
            })
        }
        catch (error) { console.log(error) }
    }

    const dateTranform = (olddate) => {
        const datePart = olddate.split("/")
        return new Date(+datePart[2], datePart[1] - 1, +datePart[0])
    }

    const onUpdate = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            await axios.put(`http://localhost:4000/user/update`, dataUpdate, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                if (res) { setIsUpdate(true) }
            }).catch((error) => {
                if (error) {
                    setError(true)
                    setMessage(error.response.data.error.message)
                }
            })
        }
        catch (error) { console.log(error) }
    }

    if (isUpdate) return <Redirect to="/course" />
    else if (status === 401) return <Redirect to="/" />
    else {
        return (
            <div>
                <h2 className="text-center mt-5">Course Management System</h2>
                <div className="mt-5" style={{ width: '26rem', margin: 'auto' }}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h3 className="text-center">Edit Profile</h3>

                            {error ? <div className="alert alert-danger mt-4" role="alert">{message}</div> : null}

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
                                    <Button
                                        onClick={onUpdate}
                                        variant="primary"
                                        size="lg"
                                    >Done</Button>
                                </div>
                            </div>

                        </Card.Body>
                    </Card>
                </div>
            </div >
        );
    }
}