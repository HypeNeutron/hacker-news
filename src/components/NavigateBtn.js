import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../hooks/context';

function NavigateBtn() {
  const { isLoading, page, nbPages, handlePage } = useGlobalContext();

  return (
    <Navigator>
      <button
        onClick={() => handlePage('dec')}
        type='button'
        disabled={isLoading}>
        Prev
      </button>
      <p>
        {page + 1} of {nbPages}
      </p>
      <button
        onClick={() => handlePage('inc')}
        type='button'
        disabled={isLoading}>
        Next
      </button>
    </Navigator>
  );
}

export default NavigateBtn;

const Navigator = styled.div`
  width: 90vw;
  max-width: var(--max-width);
  margin: 0 auto;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin-bottom: 0;
    font-size: 1.2rem;
    font-weight: bold;
  }

  button {
    margin: 1rem;
    padding: 0.25rem 0.5rem;
    text-transform: capitalize;
    font-weight: bold;
    border-color: transparent;
    background: var(--clr-primary-5);
    border-radius: var(--radius);
    color: var(--clr-white);
    letter-spacing: var(--spacing);
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  }
`;
