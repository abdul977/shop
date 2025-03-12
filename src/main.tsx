import './polyfills';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { VideoProvider } from './context/VideoContext';
import App from './App.tsx';
import './index.css';
import { unregisterServiceWorker } from './unregisterServiceWorker';

// Unregister any existing service workers
unregisterServiceWorker();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VideoProvider>
      <App />
    </VideoProvider>
  </StrictMode>
);
