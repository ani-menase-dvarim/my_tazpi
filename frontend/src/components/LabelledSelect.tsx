import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography
} from '@mui/material';

export type SelectOption<T extends string> = { value: T; label: string };

type LabelledSelectProps<T extends string> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
  required?: boolean;
  touched?: boolean;
};

export function LabelledSelect<T extends string>({
  label,
  value,
  onChange,
  options,
  placeholder = 'בחרי...',
  required,
  touched
}: LabelledSelectProps<T>) {
  const isSelected = !!value && touched;

  return (
    <Stack spacing={0.75}>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 800,
          color: 'text.secondary',
          textAlign: 'right'
        }}
      >
        {label}
        {required && <span style={{ color: '#ef4444', marginLeft: '4px' }}>*</span>}
      </Typography>

      <FormControl fullWidth>
        <Select
          displayEmpty
          value={value}
          onChange={(e: SelectChangeEvent) => onChange(e.target.value as T)}
          sx={{
            borderRadius: '12px',
            background: '#fff',
            '& .MuiSelect-select': { py: 1.4, textAlign: 'right' },
            '& fieldset': {
              borderColor: isSelected ? '#22c55e' : undefined,
              borderWidth: isSelected ? '2px' : undefined,
              transition: 'all 0.2s ease'
            },
            '&:hover fieldset': {
              borderColor: isSelected ? '#16a34a' : undefined
            },
            '&.Mui-focused fieldset': {
              borderColor: isSelected ? '#22c55e' : undefined
            }
          }}
          renderValue={(selected) => {
            if (!selected) return <span style={{ color: '#94A3B8' }}>{placeholder}</span>;
            const found = options.find((o) => o.value === selected);
            return found?.label ?? selected;
          }}
        >
          <MenuItem value="">
            <em>{placeholder}</em>
          </MenuItem>
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
