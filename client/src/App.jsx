import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'

function App() {
  const [listIssue, setListIssue] = useState([])
  const [formValues, setFormValues] = useState({
    title: "",
    description: ""
  })

  const [editData, setEditData] = useState({
    id: "",
    title: "",
    description: ""
  })
  const [isEdit, setIsEdit] = useState(false)

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setIsEdit(false)
  };
  const handleShow = () => setShow(true);

  const API_URL = 'http://localhost:3000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(isEdit)
    if(isEdit) {

      try {
        const response = await fetch(`${API_URL}/issues/${editData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // Set headers if required by API
          },
          body: JSON.stringify(editData)
        })

        const result = await response.json();
        console.log('Success:', result);
        setIsEdit(false)
        getIssue()
        handleClose()
      } catch (error) {
        console.log('ERROR:', error)
      }
    } else {
      try {
        const response = await fetch(`${API_URL}/issues`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Set headers if required by API
          },
          body: JSON.stringify(formValues)
        })

        const result = await response.json();
        getIssue()
        console.log('Success:', result);
      } catch (error) {
        console.log('ERROR:', error)
      }
    }
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const getIssue = async () => {
    const response = await fetch(`${API_URL}/issues`)
    const result = await response.json()
    setListIssue(result)
  }

  const onEdit = async (issue) => {
    setEditData(issue)
    setIsEdit(true)
    handleShow()
  }

  const onChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const onDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/issues/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // Set headers if required by API
        }
      })


      if (response.ok) {
        getIssue()
        console.log(`Issue with ID ${id} deleted successfully.`);
      } else {
        console.log('Failed to delete the issue');
      }
    } catch (error) {
      console.log('ERROR:', error)
    }
  }

  useEffect(() => {
    getIssue()
    return () => {
      
    };
  }, []);
  
  const cardIssue = (issue) => (
    <Card style={{ width: '90%', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{issue.title}</Card.Title>
        <Card.Text>
          {issue.description}
        </Card.Text>
        <Button variant="primary" onClick={() => onEdit(issue)}>Edit</Button>{' '}
        <Button variant="danger" onClick={() => onDelete(issue.id)}>Delete</Button>
      </Card.Body>
    </Card>
  )
  
  const modalEdit = (issue) => (

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Issue</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="title" name="title" value={editData.title} onChange={onChangeEdit}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="description" name="description" value={editData.description} onChange={onChangeEdit}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )

  return (
    <>
    <Row>
    <Col>

      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="title" name="title" value={formValues.title} onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="description" rows={3} name="description" value={formValues.description} onChange={handleChange}/>
          </Form.Group>
          <Button type='submit'>Save</Button>
        </Form>
      </Container>
    </Col>
    <Col>
    <div style={{height: '80vh', overflowY: 'scroll', overflowX: 'hidden'}}>
      <Container>
        {listIssue.length > 0 ? 
          listIssue.map((issue) => (
            cardIssue(issue)
          ))
        :
          <div>There is no issue</div>
        }
      </Container>
    </div>
    </Col>
    </Row>
    {modalEdit()}
    </>
  )
}

export default App
