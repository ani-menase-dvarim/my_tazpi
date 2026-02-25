import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          404
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontWeight: 600, mt: 1 }}>
          הדף לא נמצא
        </Typography>
        <Button sx={{ mt: 3 }} variant="contained" onClick={() => navigate('/')}>חזרה</Button>
      </Box>
    </AuthLayout>
  );
}
