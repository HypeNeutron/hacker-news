import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';

const reducer = (state, { type, payload: load }) => {
  switch (type) {
    case SET_LOADING: {
      return { ...state, isLoading: true };
    }

    case SET_STORIES: {
      const dataSorted = load.hits.sort(
        (a, b) => b.created_at_i - a.created_at_i
      );
      return {
        ...state,
        isLoading: false,
        hits: dataSorted,
        nbPages: load.nbPages,
      };
    }

    case REMOVE_STORY: {
      return {
        ...state,
        hits: state.hits.filter((story) => story.objectID !== load),
      };
    }

    case HANDLE_PAGE: {
      let nextPage;
      let prevPage;
      switch (load) {
        case 'inc': {
          nextPage = state.page + 1;
          if (nextPage > state.nbPages - 1) {
            nextPage = 0;
          }
          return { ...state, page: nextPage };
        }
        case 'dec': {
          prevPage = state.page - 1;
          if (prevPage < 0) {
            prevPage = state.nbPages - 1;
          }
          return { ...state, page: prevPage };
        }
        default:
          break;
      }
      return { ...state };
    }

    case HANDLE_SEARCH: {
      return { ...state, query: load, page: 0 };
    }

    default:
      throw new Error(`no matching '${type}' action type`);
  }
};
export default reducer;
