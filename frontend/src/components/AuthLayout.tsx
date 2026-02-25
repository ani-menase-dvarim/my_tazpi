import { Box, Container } from '@mui/material';
import type { PropsWithChildren } from 'react';

import Logo from '../assets/Logo.png';

type AuthLayoutProps = PropsWithChildren<{
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}>;

export function AuthLayout({ children, maxWidth = 'sm' }: AuthLayoutProps) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 5, sm: 7 }
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* לוגו למעלה, ממורכז */}
        <Box
          component="img"
          src={Logo}
          alt="עמותת התצפיתניות ישראל"
          sx={{
            width: { xs: 100, sm: 132 },
            height: 'auto',
            mb: 3,
            userSelect: 'none'
          }}
        />

        {children}
      </Container>
    </Box>
  );
}