import React from 'react';

function ErrorBanner({ errorMessage }) {
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  );
}

export default ErrorBanner;
