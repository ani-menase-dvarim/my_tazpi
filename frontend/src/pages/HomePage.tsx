import { Box, Container, Typography } from '@mui/material';
import heroImg from '../assets/Logo.png';
import { APP_COLORS } from '../theme';

export default function HomePage() {
  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', background: APP_COLORS.background }}>
      <Container maxWidth="md" sx={{ py: { xs: 6, sm: 10 } }}>
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            component="img"
            src={heroImg}
            alt=""
            sx={{
              width: 132,
              height: 132,
              objectFit: 'contain',
              borderRadius: 3,
              border: "4px solid #fff",
              boxShadow: "0 16px 30px rgba(15, 23, 42, 0.22)",
            }}
          />

          <Typography variant="h4" sx={{ mt: 1, fontWeight: 900 }}>
            ברוכות הבאות לעמותת תצפיתניות ישראל
          </Typography>

          <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
            הבית של התצפיתניות בעבר, בהווה ובעתיד
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}