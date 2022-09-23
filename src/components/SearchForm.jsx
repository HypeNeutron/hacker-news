import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context';

function SearchForm() {
  const { handleSearch, query } = useGlobalContext();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.select();
  }, [inputRef]);

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <h2>search hacker news</h2>
      <input
        type="text"
        ref={inputRef}
        className="formInput"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </Form>
  );
}

export default SearchForm;

const Form = styled.form`
  width: 90vw;
  max-width: 1170px;
  margin: 0 auto;
  margin-top: 5rem;
  margin-bottom: 3rem;

  .formInput {
    font-size: 1rem;
    max-width: 600px;
    width: 100%;
    padding: 1em;
    border: none;
    border-bottom: 3px solid var(--clr-grey-8);
    margin-top: 1em;
    background: transparent;
    color: var(--clr-grey-3);
    text-transform: uppercase;
    letter-spacing: var(--spacing);
  }
`;
