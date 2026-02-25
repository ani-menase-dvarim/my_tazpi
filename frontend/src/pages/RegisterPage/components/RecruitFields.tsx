import { Stack } from '@mui/material';
import { DatePickerField } from './DatePickerField';
import { RecruitFieldsProps } from '../types';

export function RecruitFields({
    recruitDate,
    setRecruitDate,
    touched,
    handleBlur,
    errors
}: RecruitFieldsProps) {
    return (
        <Stack spacing={2.5}>
            <DatePickerField
                label="תאריך גיוס"
                value={recruitDate}
                onChange={setRecruitDate}
                onBlur={() => handleBlur('recruitDate')}
                touched={touched['recruitDate']}
                error={!!errors?.recruitDate && (touched['recruitDate'] || touched['status'])}
                helperText={(touched['recruitDate'] || touched['status']) ? errors?.recruitDate : ''}
                required
            />
        </Stack>
    );
}
