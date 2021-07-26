import React, { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Form, Col, Button } from 'react-bootstrap';
import { useMst } from '../../../src/models/Root';
import { API_URL } from './../../../src/constants/Config';
const EditTodo: React.FC = () => {
  const router = useRouter();

  const {
    query : { id, name , complete }
  } = router;

    let idTodo: string = id.toString();
    let nameTodo: string = name.toString();
    let completeTodo: string = complete.toString();
    
  const { todoList } = useMst();
  const { todoItems } = todoList;
  const [nameEdit, setNameEdit] = useState<string>(nameTodo);
  const [completeEdit, setCompleteEdit] = useState<string>(completeTodo);
  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameEdit(e.target.value);
  }; 
  const handlerClickOption = (e) => {
      console.log(e.target.value);
      
    setCompleteEdit(e.target.value);
  }
  const sendEditData = async (e) =>{
      e.preventDefault();
      let index : number = todoItems.findIndex(item => item.id === idTodo);
      let data = {name : nameEdit, complete : completeEdit} 
      var options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
      }
      try{
        let res = await fetch(API_URL + 'TodoItems/' + idTodo, options);
        if(res.status === 200)
        {
          todoItems[index].editTodoItem(nameEdit, completeEdit);
          console.log("edit successfull");
          router.back();
        }
      }
      catch (error){
        console.log(error);
        
      }
     
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
