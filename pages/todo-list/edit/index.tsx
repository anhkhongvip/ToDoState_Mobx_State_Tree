import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import { useMst } from '../../../src/models/Root';

const EditTodo: React.FC = () => {
  const router = useRouter();
  const {
    query: { id, name , complete },
  } = router;
  const { todoList } = useMst();
  const { todoItems } = todoList;
  const [nameEdit, setNameEdit] = useState<string>(name.toString());
  const [completeEdit, setCompleteEdit] = useState<string>(complete.toString());
  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameEdit(e.target.value);
  }; 
  const handlerClickOption = (e) => {
      console.log(e.target.value);
      
    setCompleteEdit(e.target.value);
  }
  const sendEditData = (e) =>{
      e.preventDefault();
      let index = Number(id);
      todoItems[index].changeName(nameEdit);
      todoItems[index].changeComplete(completeEdit);
      console.log("edit successfull");
      router.back();
  } 
  return (
    <>
      <Container>
        <h1 className="text-center mt-5">Edit State</h1>
        <Row className="justify-content-md-center mt-5">
          <Col xs="6">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name : </Form.Label>
                <Form.Control
                  type="text"
                  value={nameEdit}
                  placeholder="Enter name"
                  onChange={handlerChange}
                />
              </Form.Group>
              <Form.Label>Complete : </Form.Label>
              <Form.Select defaultValue={complete} onChange={handlerClickOption}>
                   <option value="True">True</option> 
                   <option value="False">False</option>
              </Form.Select>
              <Button variant="primary" className="mt-3" onClick = {sendEditData}>Sửa thông tin</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditTodo;
