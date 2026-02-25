import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import logoImg from '../assets/Logo.png';

export default function IntroPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout maxWidth="md">
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Box
          component="img"
          src={logoImg}
          alt=""
          sx={{
            width: 112,
            height: 112,
            objectFit: 'contain',
            borderRadius: 3,
            border: '4px solid #fff',
            boxShadow: '0 16px 30px rgba(15, 23, 42, 0.22)'
          }}
        />

        <Typography variant="h4" sx={{ mt: 1, fontWeight: 900 }}>
          ברוכות הבאות לעמותת תצפיתניות ישראל
        </Typography>

        <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
          הבית של התצפיתניות בעבר, בהווה ובעתיד
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mt: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            onClick={() => navigate('/login')}
            variant="contained"
            sx={{
              minWidth: 160,
              height: 50,
              bgcolor: '#fff',
              color: 'secondary.main',
              boxShadow: '0 10px 18px rgba(15, 23, 42, 0.18)',
              '&:hover': { bgcolor: '#fff' }
            }}
          >
            התחברות
          </Button>

          <Button
            onClick={() => navigate('/register')}
            variant="contained"
            sx={{
              minWidth: 160,
              height: 50,
              boxShadow: '0 10px 18px rgba(15, 23, 42, 0.18)'
            }}
          >
            הרשמה
          </Button>
        </Box>
      </Box>
    </AuthLayout>
  );
}
