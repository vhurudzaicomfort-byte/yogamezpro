import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/globals.css';
import { ThemeProvider } from './hooks/useTheme';
import { SessionProvider } from './hooks/useSession';
import { ToastProvider } from './hooks/useToast';
import { WheelProvider } from './hooks/useWheel';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SessionProvider>
          <ToastProvider>
            <WheelProvider>
              <App />
            </WheelProvider>
          </ToastProvider>
        </SessionProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
