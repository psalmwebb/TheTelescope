import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import React from 'react';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
);