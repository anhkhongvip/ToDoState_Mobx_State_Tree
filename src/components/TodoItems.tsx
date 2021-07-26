import React from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useMst } from '../models/Root';
import { API_URL } from './../constants/Config';
interface TodoItemsProps {}
const TodoItems: React.FC<TodoItemsProps> = observer(() => {
  const { todoList } = useMst();
  const { todoItems } = todoList;
  const router = useRouter();
  const removeItem = async (id: string) => {
    let index : number = todoItems.findIndex(item => item.id === id); 
    var options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
    try{
      let res = await fetch(API_URL + 'TodoItems/' + id, options)
      if(res.status === 200)
      {
        todoItems[index].remove();
        console.log('Remove successful');
      }
    }
    catch(error)
    {
      console.log(error);
    }
  };
  const routerEdit = (key: number, val: TodoItem) => {
    router.push({
      pathname: '/todo-list/edit',
      query: {
        id: val.id,
        name: val.name,
        complete: val.complete
      },
    });
  };
  return (
    <>
      {todoItems.length != 0 ? (
        todoItems.map((val, key) => {
          return (
            <Row key={key} className="mt-2">
              <Col xs="2">{key + 1}</Col>
              <Col xs="3">{val.name}</Col>
              <Col xs="3">{val.complete}</Col>
              <Col xs="4">
                <Button variant="warning" onClick={() => routerEdit(key, val)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => removeItem(val.id)}>
                  Remove
                </Button>
              </Col>
            </Row>
          );
        })
      ) : (
        <h4 className="mt-4 ">
          Danh sách trống
        </h4>
      )}
    </>
  );
});

export default TodoItems;
