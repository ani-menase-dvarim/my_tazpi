import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { LabelledTextField } from '../components/LabelledTextField';
import { supabase } from '../supabaseClient';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = useMemo(() => email.trim().length > 0 && password.trim().length > 0, [email, password]);

  const handleLogin = async () => {
    if (!canSubmit || isSubmitting) return;
    setErrorText('');
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) {
        setErrorText(error.message);
        return;
      }

      // Redirect only when a real session exists
      if (data.session) {
        navigate('/', { replace: true });
        return;
      }

      setErrorText('התחברות לא הושלמה. נסי שוב.');
    } catch {
      setErrorText('משהו השתבש. נסי שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <Paper
        sx={{
          width: '100%',
          maxWidth: 460,
          px: { xs: 3, sm: 6 },
          py: { xs: 4, sm: 6 },
          borderRadius: '28px'
        }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, fontWeight: 900 }}>
          התחברות
        </Typography>

        <Stack spacing={2.5}>
          <LabelledTextField
            label="כתובת מייל"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            inputMode="email"
          />

          <LabelledTextField
            label="סיסמה"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label={showPassword ? 'hide password' : 'show password'}
                    onClick={() => setShowPassword((s) => !s)}
                    edge="start"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            fullWidth
            variant="contained"
            disabled={!canSubmit || isSubmitting}
            onClick={handleLogin}
            sx={{ height: 54, mt: 1, boxShadow: '0 12px 22px rgba(15, 23, 42, 0.18)' }}
          >
            התחבר
          </Button>

          {errorText ? (
            <Typography sx={{ color: 'error.main', fontWeight: 700, fontSize: 12, textAlign: 'center', mt: -1 }}>
              {errorText}
            </Typography>
          ) : null}

          <Box sx={{ textAlign: 'center', pt: 1 }}>
            <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
              עדיין לא נרשמת?{' '}
              <Link
                component="button"
                onClick={() => navigate('/register')}
                underline="none"
                sx={{ color: 'secondary.main', fontWeight: 900 }}
              >
                הרשמי כאן
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </AuthLayout>
  );
}
