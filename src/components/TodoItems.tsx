import React from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useMst } from '../models/Root';
const TodoItems: React.FC = observer(() => {
  const { todoList } = useMst();
  const { todoItems } = todoList;
  const router = useRouter();
  const removeItem = (key) => {
        todoItems[key].remove();
        console.log("Remove successful");
        
  }
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
                <Button variant="warning" onClick ={() => {router.push({
                    pathname : '/todo-list/edit',
                    query : {
                        id : key,
                        name : val.name,
                        complete : val.complete
                    }
                })}}>Edit</Button>
                <Button variant="danger" onClick={() => removeItem(key)}>Remove</Button>
              </Col>
            </Row>
          );
        })
      ) : (
        <h4 className="mt-4" style={{ marginLeft: '25%' }}>
          Danh sách trống
        </h4>
      )}
    </>
  );
});

export default TodoItems;
