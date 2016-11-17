import { CONTENTREADY } from '../actions/types';
export default function (state = {}, action) {

  switch (action.type) {
    case CONTENTREADY:
      const { payload:{ content } } =action;
      return content;
  }

  return state;
}