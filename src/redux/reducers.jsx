import { combineReducers } from 'redux';
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from './actions';

const initialState = {
  wishlistBooks: [],
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlistBooks: [...state.wishlistBooks, action.payload],
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlistBooks: state.wishlistBooks.filter(book => book.bookId !== action.payload),
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  wishlist: wishlistReducer,
});

export default rootReducer;
