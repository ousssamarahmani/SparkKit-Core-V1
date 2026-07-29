import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import SparkKitSite from './SparkKitSite';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SparkKitSite />
  </StrictMode>,
);
