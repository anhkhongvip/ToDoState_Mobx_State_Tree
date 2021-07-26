import { types, getParent, Instance } from 'mobx-state-tree';
import { TodoListModel } from './Root';
export const TodoItemsModel = types
.model('TodoItems', {
    id: types.identifier,
    name: types.string,
    complete: types.string,
  })
.actions(self =>({

  editTodoItem(newName : string, newComplete : string){
    self.name = newName;
    self.complete = newComplete;
  },
  remove() {
    getParent<typeof TodoListModel>(self, 2).remove(self);
  }

}));