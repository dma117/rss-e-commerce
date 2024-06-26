import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ApiRootContextProvider from './contexts/apiRootContext.tsx';
import UserContextProvider from './contexts/userContext.tsx';

ReactDOM.createRoot(getRootDiv()).render(
  <React.StrictMode>
    <ApiRootContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </ApiRootContextProvider>
  </React.StrictMode>,
);

function getRootDiv(): HTMLDivElement {
  const rootDiv = document.createElement('div');
  rootDiv.id = 'root';
  document.body.append(rootDiv);

  return rootDiv;
}
