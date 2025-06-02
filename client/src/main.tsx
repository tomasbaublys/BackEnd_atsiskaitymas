import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { BookProvider } from './contexts/BookContext.tsx';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <BrowserRouter>
    <BookProvider>
      <App />
    </BookProvider>
  </BrowserRouter>
);