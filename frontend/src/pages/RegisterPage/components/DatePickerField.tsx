import { Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface DatePickerFieldProps {
    label: string;
    value: Dayjs | null;
    onChange: (val: Dayjs | null) => void;
    required?: boolean;
    touched?: boolean;
    onBlur?: () => void;
    error?: boolean;
    helperText?: string;
}

export function DatePickerField({
    label,
    value,
    onChange,
    required,
    touched,
    onBlur,
    error,
    helperText
}: DatePickerFieldProps) {
    const isFilled = !!value && touched;

    return (
        <Box sx={{ width: '100%' }}>
            <Typography
                sx={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: 'text.secondary',
                    textAlign: 'right',
                    mb: 0.75
                }}
            >
                {label}
                {required && <span style={{ color: '#ef4444', marginRight: '4px' }}>*</span>}
            </Typography>
            <DatePicker
                value={value}
                onChange={(val) => {
                    onChange(val);
                    if (onBlur) onBlur();
                }}
                format="DD/MM/YYYY"
                slotProps={{
                    textField: {
                        placeholder: 'dd/mm/yyyy',
                        fullWidth: true,
                        onBlur: onBlur,
                        error: error,
                        helperText: helperText,
                        sx: {
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                backgroundColor: '#fff',
                                '& fieldset': {
                                    borderColor: error ? '#ef4444' : (isFilled ? '#22c55e' : undefined),
                                    borderWidth: (isFilled || error) ? '2px' : undefined,
                                    transition: 'all 0.2s ease'
                                },
                                '&:hover fieldset': {
                                    borderColor: error ? '#dc2626' : (isFilled ? '#16a34a' : undefined)
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: error ? '#ef4444' : (isFilled ? '#22c55e' : undefined)
                                }
                            },
                            '& .MuiOutlinedInput-input': { py: 1.4, textAlign: 'right' },
                            '& .MuiFormHelperText-root': { textAlign: 'right', fontWeight: 600 }
                        }
                    }
                }}
            />
        </Box>
    );
}
