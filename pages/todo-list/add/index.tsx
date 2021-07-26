import React, {FC, useState, ChangeEvent} from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useMst } from "../../../src/models/Root";
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid';
import  { API_URL }  from '../../../src/constants/Config'
import { observer } from 'mobx-react';
interface addTodoProps { 

}
const addTodo : FC<addTodoProps> = () => {
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [complete, setComplete] = useState<string>();
  const { todoList } = useMst();
  const handlerChange = (e : ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
  }
  const addNewTodo = async (e) => {
    e.preventDefault();
    const todo : TodoItem  = { id : uuidv4(), name , complete }
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body : JSON.stringify(todo)
    }
    try{
      let res = await fetch(API_URL + 'TodoItems', options)
      if(res.status === 201)
      {
        console.log(todo);
        todoList.addTodoItem(todo);
        console.log('add new successful');
        router.back();
      }
     
    }
    catch(error)
    {
      console.log(error);
      
    }
  }
  return (
    <div>
      <Container>
        <h1 className="text-center mt-5">ADD TODO</h1>
        <Row className="justify-content-md-center mt-5">
          <Col xs="6">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name : </Form.Label>
                <Form.Control type="text" placeholder="Enter name" onChange = {handlerChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formComplete">
                {' '}
                <Form.Label>Complete : </Form.Label><br/>
                <input
                  type="radio"
                  name="check-complete"
                  defaultValue="True"
                  onClick = {() => {setComplete("True")}}
                />
                <label className="ms-2" htmlFor="true">
                  True
                </label>
                <input
                  className="ms-3"
                  type="radio"
                  name="check-complete"
                  defaultValue="False"
                  onClick = {() => {setComplete("False")}}
                />
                <label className="ms-2" htmlFor="false">
                  False
                </label>
                <br />
              </Form.Group>
              <Button variant="primary" type="submit" onClick = {addNewTodo}>Thêm mới</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default observer(addTodo);
