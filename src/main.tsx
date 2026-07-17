import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/globals.css';
import { ThemeProvider } from './hooks/useTheme';
import { SessionProvider } from './hooks/useSession';
import { CurrencyProvider } from './hooks/useCurrency';
import { ToastProvider } from './hooks/useToast';
import { WheelProvider } from './hooks/useWheel';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SessionProvider>
          <CurrencyProvider>
            <ToastProvider>
              <WheelProvider>
                <App />
              </WheelProvider>
            </ToastProvider>
          </CurrencyProvider>
        </SessionProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
