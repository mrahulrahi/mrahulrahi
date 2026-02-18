import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GradientProvider } from './context/GradientContext.jsx';
import { BrowserRouter } from 'react-router'; // Make sure to import from react-router-dom
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes/AppRoutes.jsx';
import 'highlight.js/styles/atom-one-dark.css'; // Highlight.js CSS
import './index.css';


// Create a client
const queryClient = new QueryClient();


// Main React App rendering
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GradientProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </GradientProvider>
  </StrictMode>
);