import React from 'react';
import {createRoot} from 'react-dom/client';
import {CmsProvider} from './context/CmsContext';
import {ErrorBoundary} from './ErrorBoundary';
import App from './App';
import './index.css';

const root=document.getElementById('root');
if(!root) throw new Error('Missing #root element');
createRoot(root).render(<ErrorBoundary><CmsProvider><App/></CmsProvider></ErrorBoundary>);
