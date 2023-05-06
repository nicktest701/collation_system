import Scrollbars from 'react-custom-scrollbars';
import { Chart, registerables } from 'chart.js';

import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import ThemeProvider from './theme';
import Root from './pages/layouts/Root';
import Error from './pages/Error';
import RootProvider from './context/providers/RootProvider';
import PartyProvider from './context/providers/PartyProvider';
import PresidentProvider from './context/providers/PresidentProvider';
import ParliamentarianProvider from './context/providers/ParliamentarianProvider';
import ConstituencyProvider from './context/providers/ConstituencyProvider';

Chart.register(...registerables);

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        networkMode: 'offlineFirst',
      },
      queries: {
        networkMode: 'offlineFirst',
      },
    },
  });
  const { reset } = useQueryErrorResetBoundary();

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={Error} onReset={reset}>
        <ThemeProvider>
          <Scrollbars>
            <RootProvider>
              <PresidentProvider>
                <ParliamentarianProvider>
                  <PartyProvider>
                    <ConstituencyProvider>
                      <Root />
                    </ConstituencyProvider>
                  </PartyProvider>
                </ParliamentarianProvider>
              </PresidentProvider>
            </RootProvider>
          </Scrollbars>
        </ThemeProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
