import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from './components/theme-provider.tsx';

import { QueryContextProvider } from './context/QueryContext.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storageKey="vite-ui-theme">
        <QueryContextProvider>
          <App />
        </QueryContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
