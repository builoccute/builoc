import React from 'react';
import {createRoot} from 'react-dom/client';
import {CmsProvider} from './context/CmsContext';
import App from './App';
import './index.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><CmsProvider><App/></CmsProvider></React.StrictMode>);
