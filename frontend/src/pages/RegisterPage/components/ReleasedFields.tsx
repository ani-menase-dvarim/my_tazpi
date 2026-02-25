import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { ServingFields } from './ServingFields';
import { ReleasedFieldsProps } from '../types';

export function ReleasedFields({
    activeReserve,
    setActiveReserve,
    ...servingProps
}: ReleasedFieldsProps) {
    return (
        <Stack spacing={2.5}>
            <ServingFields {...servingProps} />
            <FormControlLabel
                labelPlacement="start"
                sx={{ alignItems: 'center', m: 0, width: '100%', justifyContent: 'end' }}
                control={
                    <Checkbox checked={activeReserve} onChange={(e) => setActiveReserve(e.target.checked)} />
                }
                label={
                    <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        שירות מילואים פעיל
                    </Typography>
                }
            />
        </Stack>
    );
}
