import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import HonestSite from './HonestSite.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HonestSite />
  </StrictMode>,
);
