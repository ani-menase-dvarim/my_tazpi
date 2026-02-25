import { Stack } from '@mui/material';
import { LabelledSelect } from '../../../components/LabelledSelect';
import { CONNECTION_OPTIONS } from '../consts';
import { OtherFieldsProps } from '../types';

export function OtherFields({
    connection,
    setConnection,
    touched,
    handleBlur
}: OtherFieldsProps) {
    return (
        <Stack spacing={2.5}>
            <LabelledSelect<string>
                label="קשר לעמותה"
                value={connection}
                onChange={(newVal) => {
                    setConnection(newVal);
                    handleBlur('connection');
                }}
                touched={touched['connection']}
                placeholder="בחרי קשר לעמותה"
                required
                options={CONNECTION_OPTIONS}
            />
        </Stack>
    );
}
