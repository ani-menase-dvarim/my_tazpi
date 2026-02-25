import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';
import {
    Box,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    Typography
} from '@mui/material';
import { LabelledTextField } from '../../../components/LabelledTextField';
import { LabelledSelect } from '../../../components/LabelledSelect';
import { Status, STATUS_OPTIONS } from '../consts';
import { BasicInfoFieldsProps } from '../types';

export function BasicInfoFields({
    username,
    setUsername,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    status,
    setStatus,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isNewsletter,
    setIsNewsletter,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    touched,
    handleBlur,
    isValidEmail,
    isValidPhone,
    passwordsMatch
}: BasicInfoFieldsProps) {
    return (
        <Stack spacing={2.5}>
            <LabelledTextField
                label="שם מלא"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => handleBlur('username')}
                touched={touched['username']}
                autoComplete="name"
                required
            />
            <LabelledSelect<Status>
                label="סטטוס"
                value={status}
                onChange={(newStatus) => {
                    setStatus(newStatus);
                    handleBlur('status');
                }}
                touched={touched['status']}
                placeholder="הכנס סטטוס"
                required
                options={STATUS_OPTIONS}
            />
            <LabelledTextField
                label="כתובת מייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                touched={touched['email']}
                autoComplete="email"
                inputMode="email"
                error={touched['email'] && email.length > 0 && !isValidEmail}
                helperText={touched['email'] && email.length > 0 && !isValidEmail ? 'כתובת מייל לא תקינה' : ''}
                required
            />
            <LabelledTextField
                label="מספר טלפון"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={() => handleBlur('phoneNumber')}
                touched={touched['phoneNumber']}
                autoComplete="tel"
                inputMode="tel"
                error={touched['phoneNumber'] && phoneNumber.length > 0 && !isValidPhone}
                helperText={touched['phoneNumber'] && phoneNumber.length > 0 && !isValidPhone ? 'מספר טלפון לא תקין' : ''}
                required
            />
            <LabelledTextField
                label="סיסמה"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                touched={touched['password']}
                autoComplete="new-password"
                helperText="לפחות 6 תווים"
                required
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="start">
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <LabelledTextField
                label="וידוא סיסמה"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                touched={touched['confirmPassword']}
                autoComplete="new-password"
                error={touched['confirmPassword'] && confirmPassword.length > 0 && !passwordsMatch}
                helperText={
                    touched['confirmPassword'] && confirmPassword.length > 0 && !passwordsMatch
                        ? 'הסיסמאות לא תואמות'
                        : ' '
                }
                required
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="start">
                                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <Box sx={{ mt: 4 }}>
                <FormControlLabel
                    labelPlacement="start"
                    sx={{ alignItems: 'center', m: 0, width: '100%', justifyContent: 'end' }}
                    control={<Checkbox checked={isNewsletter} onChange={(e) => setIsNewsletter(e.target.checked)} />}
                    label={
                        <Typography sx={{ color: 'text.secondary', fontWeight: 800, fontSize: 13 }}>
                            אני מאשרת קבלת דיוור וניוזלטר מהעמותה
                            <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>
                        </Typography>
                    }
                />
            </Box>
        </Stack>
    );
}
