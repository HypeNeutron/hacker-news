import axios from 'axios';
import { useDebouncedCallback } from 'use-debounce';
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import {
  SET_LOADING,
  SET_STORIES,
  SET_ERROR,
  REMOVE_STORY,
  HANDLE_SEARCH,
  HANDLE_PAGE,
} from './actions';
import getError from '../utils/helper';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const initialState = {
  isLoading: true,
  error: { state: false, message: null },
  hits: [],
  query: 'nextjs',
  page: 0,
  nbPages: 0,
};

const AppContext = React.createContext();
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    if (url !== undefined) {
      try {
        dispatch({ type: SET_LOADING, payload: true });
        const { data } = await axios(url);
        dispatch({
          type: SET_STORIES,
          payload: { hits: data.hits, nbPages: data.nbPages },
        });
        dispatch({ type: SET_LOADING, payload: false });
      } catch (error) {
        dispatch({
          type: SET_ERROR,
          payload: {
            state: true,
            message: getError(error),
          },
        });
        dispatch({ type: SET_LOADING, payload: false });
      }
    }
  };

  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id });
  };

  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };

  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value });
  };

  const fetchDebounce = useDebouncedCallback((page, query) => {
    fetchStories(
      // # timestamps unix >2019 https://www.epochconverter.com/
      `${API_ENDPOINT}query=${query}&numericFilters=created_at_i>1546300800&page=${page}`
    );
  }, 1000);

  useEffect(() => {
    fetchStories(fetchDebounce(state.page, state.query));
  }, [state.page, state.query, fetchDebounce]);

  const valueMemo = React.useMemo(() => {
    return {
      ...state,
      removeStory,
      handleSearch,
      handlePage,
    };
  }, [state]);

  return (
    <AppContext.Provider value={valueMemo}>{children}</AppContext.Provider>
  );
}

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
