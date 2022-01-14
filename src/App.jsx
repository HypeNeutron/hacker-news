import React from 'react';
import SearchForm from './components/SearchForm';
import Stories from './components/Stories';
import NavigateBtn from './components/NavigateBtn';

function App() {
  return (
    <>
      <SearchForm />
      <NavigateBtn />
      <Stories />
    </>
  );
}

export default App;
