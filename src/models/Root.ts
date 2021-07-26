import {
  Instance,
  onSnapshot,
  SnapshotIn,
  destroy,
  types,
  flow,
  cast
} from 'mobx-state-tree';
import { createContext, useContext } from "react";
import { TodoItemsModel } from './TodoItems' 
import { API_URL } from '../constants/Config';

export const TodoListModel = types
.model('TodoList', {
  name: types.string,
  todoItems: types.array(TodoItemsModel),
})
.actions(self => ({
    addTodoItem(
      todoItem : SnapshotIn<typeof TodoItemsModel> | Instance<typeof TodoItemsModel>
    ){
      self.todoItems.push(todoItem)
    },
    getTodoItems: flow(function * (){
      try{
         const response  = yield window.fetch(API_URL + 'TodoItems');
         const items : TodoItem[]  = yield response.json();
         self.todoItems.push(...items)
      }
      catch (error)
      {
        console.log(error);
      }
    }),
    remove(item: SnapshotIn<typeof TodoItemsModel>) {
      destroy(item);
    }
}));

const RootModel = types.model('Root', {
  todoList: TodoListModel,
});

let initialState = RootModel.create({
    todoList : {
      name : 'Todo State',
      todoItems : []
    }
})

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  console.log("Snapshot: ", snapshot);
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}

export type TodoItemsModel = Instance<typeof TodoItemsModel>

