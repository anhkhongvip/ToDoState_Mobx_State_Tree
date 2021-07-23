import { types, getParent } from 'mobx-state-tree';
import { TodoListModel } from './Root';
export const TodoItemsModel = types
.model('TodoItems', {
    id: types.identifier,
    name: types.string,
    complete: types.string,
  })
.actions(self =>({

  changeName(newName : string)
  {
    self.name = newName;
  },

  changeComplete(newComplete : string)
  {
    self.complete = newComplete;
  },

  remove() {
    getParent<typeof TodoListModel>(self, 2).remove(self);
  }

}));