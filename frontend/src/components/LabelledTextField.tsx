import { TextField, Typography } from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';

type Props = TextFieldProps & {
  label: string;
  touched?: boolean;
};

export function LabelledTextField({ label, touched, ...props }: Props) {
  const isFilled = !!props.value && !props.error && touched;

  return (
    <div>
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
        {props.required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
      </Typography>

      <TextField
        fullWidth
        {...props}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: '#fff',
            '& fieldset': {
              borderColor: isFilled ? '#22c55e' : undefined,
              borderWidth: isFilled ? '2px' : undefined,
              transition: 'all 0.2s ease'
            },
            '&:hover fieldset': {
              borderColor: isFilled ? '#16a34a' : undefined
            },
            '&.Mui-focused fieldset': {
              borderColor: isFilled ? '#22c55e' : undefined
            }
          },
          '& .MuiOutlinedInput-input': {
            py: 1.4,
            textAlign: 'right'
          },
          ...props.sx
        }}
      />
    </div>
  );
}