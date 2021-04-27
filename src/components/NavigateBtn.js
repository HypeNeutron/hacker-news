import React from 'react';
import { useGlobalContext } from '../hooks/context';

const NavigateBtn = () => {
  const { isLoading, page, nbPages, handlePage } = useGlobalContext();

  return (
    <div className="btn-container">
      <button onClick={() => handlePage('dec')} disabled={isLoading}>
        Prev
      </button>
      <p>
        {page + 1} of {nbPages}
      </p>
      <button onClick={() => handlePage('inc')} disabled={isLoading}>
        Next
      </button>
    </div>
  );
};

export default NavigateBtn;
