import { IDataItem } from 'models/home';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface HomeState {
  inforItems?: IDataItem[];
  newInforItems?: IDataItem[];
  isEqual?: boolean;
}

// set lai type
export const setListItem = createCustomAction('home/getListItem', (data: IDataItem[]) => ({
  data,
}));

export const setMoreItem = createCustomAction('home/setMoreItem', (data: IDataItem[]) => ({
  data,
}));

export const cleanDataItem = createCustomAction('home/cleanDataItem');

export const changeItems = createCustomAction(
  'home/changeItems',
  (data: { id: number; title: string }) => ({
    data,
  })
);

export const compareToArray = createCustomAction('home/compareToArray', () => {
  return;
});

export const confirmChange = createCustomAction('home/confirmChange', () => {
  return;
});

export const resetItems = createCustomAction('home/resetItems', () => {
  return;
});

const actions = {
  setListItem,
  setMoreItem,
  cleanDataItem,
  changeItems,
  compareToArray,
  confirmChange,
  resetItems,
};

type Action = ActionType<typeof actions>;

export default function reducer(state: HomeState = { isEqual: true }, action: Action) {
  switch (action.type) {
    case getType(setListItem):
      return { ...state, inforItems: action.data, newInforItems: action.data };

    case getType(setMoreItem):
      return {
        ...state,
        inforItems: state.inforItems?.concat(action.data),
        newInforItems: state.newInforItems?.concat(action.data),
      };

    case getType(changeItems): {
      const newItems = state.newInforItems?.map((item) => {
        if (item.id === action.data.id) {
          return { ...item, title: action.data.title };
        }
        return item;
      });
      return {
        ...state,
        newInforItems: newItems,
      };
    }

    case getType(compareToArray):
      return {
        ...state,
        isEqual:
          state.inforItems &&
          state.newInforItems?.every((value, index) => {
            if (!state.inforItems) {
              return true;
            }
            return value.title === state.inforItems[index].title;
          }),
      };
    case getType(confirmChange): {
      const newItems = state.inforItems?.map((item, index) => {
        if (state.inforItems && state.newInforItems) {
          if (item.title !== state.newInforItems[index].title) {
            return state.newInforItems[index];
          }
        }
        return item;
      });
      return {
        ...state,
        isEqual: true,
        inforItems: newItems,
      };
    }

    case getType(resetItems):
      return {
        ...state,
        isEqual: true,
        newInforItems: state.inforItems?.map((item, index) => {
          if (state.inforItems && state.newInforItems) {
            if (item.title !== state.newInforItems[index].title) {
              return { ...item, title: state.inforItems[index].title };
            }
          }
          return item;
        }),
      };
    default:
      return state;
  }
}
