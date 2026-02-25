import {
    Box,
    Button,
    Link,
    Paper,
    Typography
} from '@mui/material';
import { Dayjs } from 'dayjs';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/AuthLayout';
import { supabase } from '../../supabaseClient';
import { Status } from './consts';
import { validateEmail, validatePhone, checkStatusFieldsValid } from './functions';
import * as styles from './styles';
import { BasicInfoFields } from './components/BasicInfoFields';
import { RecruitFields } from './components/RecruitFields';
import { ServingFields } from './components/ServingFields';
import { ReleasedFields } from './components/ReleasedFields';
import { OtherFields } from './components/OtherFields';

export default function RegisterPage() {
    const navigate = useNavigate();

    // Basic info state
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [status, setStatus] = useState<Status>('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNewsletter, setIsNewsletter] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Status-specific state
    const [recruitDate, setRecruitDate] = useState<Dayjs | null>(null);
    const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(null);
    const [sector, setSector] = useState('');
    const [hamalUnit, setHamalUnit] = useState('');
    const [releaseRank, setReleaseRank] = useState('');
    const [activeReserve, setActiveReserve] = useState(false);
    const [connection, setConnection] = useState('');

    // Form state
    const [errorText, setErrorText] = useState<string>('');
    const [infoText, setInfoText] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleBlur = (field: string) => setTouched((prev) => ({ ...prev, [field]: true }));

    // Validation
    const isValidEmail = useMemo(() => validateEmail(email), [email]);
    const isValidPhone = useMemo(() => validatePhone(phoneNumber), [phoneNumber]);
    const statusValidation = useMemo(() =>
        checkStatusFieldsValid(status, recruitDate, dischargeDate, sector, hamalUnit, releaseRank, connection),
        [status, recruitDate, dischargeDate, sector, hamalUnit, releaseRank, connection]
    );
    const isStatusFieldsValid = statusValidation.isValid;
    const passwordsMatch = password.length > 0 && password === confirmPassword;

    const canSubmit = useMemo(() => {
        return (
            username.trim().length > 0 &&
            isValidEmail &&
            isValidPhone &&
            status !== '' &&
            isStatusFieldsValid &&
            password.trim().length >= 6 &&
            passwordsMatch &&
            isNewsletter
        );
    }, [username, isValidEmail, isValidPhone, status, isStatusFieldsValid, password, passwordsMatch, isNewsletter]);

    // Submission
    const handleRegister = async () => {
        if (!canSubmit || isSubmitting) return;
        setErrorText('');
        setInfoText('');
        setIsSubmitting(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email.trim(),
                password,
                options: {
                    data: {
                        username: username.trim(),
                        phone_number: phoneNumber.trim(),
                        status,
                        recruit_date: recruitDate ? recruitDate.format('YYYY-MM-DD') : null,
                        discharge_date: dischargeDate ? dischargeDate.format('YYYY-MM-DD') : null,
                        sector,
                        hamal_unit: hamalUnit,
                        release_rank: releaseRank,
                        active_reserve: activeReserve,
                        connection,
                        is_newsletter: isNewsletter
                    }
                }
            });

            if (error) {
                setErrorText(error.message);
                return;
            }

            if (!data.session) {
                setInfoText('Check your email and confirm your account before logging in.');
                return;
            }

            navigate('/', { replace: true });
        } catch {
            setErrorText('משהו השתבש. נסי שוב.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render the correct status-specific fields
    const renderStatusFields = () => {
        const sharedServingProps = {
            sector, setSector,
            hamalUnit, setHamalUnit,
            recruitDate, setRecruitDate,
            dischargeDate, setDischargeDate,
            releaseRank, setReleaseRank,
            touched, handleBlur
        };

        switch (status) {
            case 'recruit':
                return (
                    <RecruitFields
                        recruitDate={recruitDate}
                        setRecruitDate={setRecruitDate}
                        touched={touched}
                        handleBlur={handleBlur}
                        errors={statusValidation.errors}
                    />
                );
            case 'serving':
                return <ServingFields {...sharedServingProps} errors={statusValidation.errors} />;
            case 'released':
                return (
                    <ReleasedFields
                        {...sharedServingProps}
                        activeReserve={activeReserve}
                        setActiveReserve={setActiveReserve}
                        errors={statusValidation.errors}
                    />
                );
            case 'other':
                return (
                    <OtherFields
                        connection={connection}
                        setConnection={setConnection}
                        touched={touched}
                        handleBlur={handleBlur}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <AuthLayout maxWidth="md">
            <Paper sx={styles.paperStyles}>
                <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, fontWeight: 900 }}>
                    הרשמה למערכת
                </Typography>

                <Box sx={styles.containerStyles}>
                    {/* Dynamic status-specific fields (left column) */}
                    <Box sx={styles.getDynamicColumnStyles(status)}>
                        <Box sx={styles.dynamicBoxStyles}>
                            {renderStatusFields()}
                        </Box>
                    </Box>

                    {/* Basic info fields (right column) */}
                    <Box sx={styles.getBasicColumnStyles(status)}>
                        <BasicInfoFields
                            username={username} setUsername={setUsername}
                            email={email} setEmail={setEmail}
                            phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                            status={status} setStatus={setStatus}
                            password={password} setPassword={setPassword}
                            confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                            isNewsletter={isNewsletter} setIsNewsletter={setIsNewsletter}
                            showPassword={showPassword} setShowPassword={setShowPassword}
                            showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword}
                            touched={touched} handleBlur={handleBlur}
                            isValidEmail={isValidEmail}
                            isValidPhone={isValidPhone}
                            passwordsMatch={passwordsMatch}
                        />
                    </Box>
                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    disabled={!canSubmit || isSubmitting}
                    onClick={handleRegister}
                    sx={{ height: 54, mt: 4, boxShadow: '0 12px 22px rgba(15, 23, 42, 0.18)' }}
                >
                    הרשמה
                </Button>

                {errorText ? (
                    <Typography sx={{ color: 'error.main', fontWeight: 700, fontSize: 12, textAlign: 'center', mt: 1 }}>
                        {errorText}
                    </Typography>
                ) : null}

                {!errorText && infoText ? (
                    <Typography sx={{ color: 'text.secondary', fontWeight: 700, fontSize: 12, textAlign: 'center', mt: 1 }}>
                        {infoText}
                    </Typography>
                ) : null}

                <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        <Link
                            component="button"
                            onClick={() => navigate('/login')}
                            underline="none"
                            sx={{ color: 'secondary.main', fontWeight: 900 }}
                        >
                            התחברי כאן
                        </Link>                        ?כבר יש לך משתמש {' '}
                    </Typography>
                </Box>
            </Paper>
        </AuthLayout>
    );
}
