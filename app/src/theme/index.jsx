import PropTypes from 'prop-types';
import { useMemo } from 'react';
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from '@mui/material/styles';
import { StyledEngineProvider, CssBaseline } from '@mui/material';

import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';

// ----------------------------------------------------------------------

function ThemeProvider({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette: {
        ...palette,
      },

      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    []
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
export default ThemeProvider;
