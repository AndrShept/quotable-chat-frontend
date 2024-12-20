import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Toaster } from 'sonner';

import App from './App.tsx';
import { Spinner } from './components/Spinner.tsx';
import { ConversationPageById } from './components/pages/ConversationPageById.tsx';
import NotFoundPage from './components/pages/NotFoundPage.tsx';
import { ThemeProvider } from './components/providers/ThemeProvider.tsx';
import './index.css';
import { AUTH_CLIENT_ID } from './lib/constants/index.ts';
import { store } from './lib/redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider  storageKey="vite-ui-theme">
        <GoogleOAuthProvider clientId={AUTH_CLIENT_ID}>
          <main className="flex h-screen">
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={null} />
                  <Route
                    path="/conversation/:id"
                    element={<ConversationPageById />}
                  />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </main>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
