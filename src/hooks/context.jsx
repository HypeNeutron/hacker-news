import { useDebouncedCallback } from 'use-debounce';
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_SEARCH,
  HANDLE_PAGE,
} from './actions';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';
const AppContext = React.createContext();
const initialState = {
  isLoading: true,
  hits: [],
  query: 'react 18',
  page: 0,
  nbPages: 0,
};

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {
      throw new Error();
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
      // timestamps unix >2019 https://www.epochconverter.com/
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
