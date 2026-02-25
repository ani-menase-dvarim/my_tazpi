import { Grid, Stack } from '@mui/material';
import { LabelledTextField } from '../../../components/LabelledTextField';
import { LabelledSelect } from '../../../components/LabelledSelect';
import { DatePickerField } from './DatePickerField';
import { RANK_OPTIONS } from '../consts';
import { ServingFieldsProps } from '../types';

export function ServingFields({
    sector,
    setSector,
    hamalUnit,
    setHamalUnit,
    recruitDate,
    setRecruitDate,
    dischargeDate,
    setDischargeDate,
    releaseRank,
    setReleaseRank,
    touched,
    handleBlur,
    errors
}: ServingFieldsProps) {
    return (
        <Stack spacing={2.5}>
            <LabelledTextField
                label="גזרה"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                onBlur={() => handleBlur('sector')}
                touched={touched['sector']}
                required
            />
            <LabelledTextField
                label="חמ״ל"
                value={hamalUnit}
                onChange={(e) => setHamalUnit(e.target.value)}
                onBlur={() => handleBlur('hamalUnit')}
                touched={touched['hamalUnit']}
                required
            />
            <Grid container spacing={2}>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={6}>
                    <DatePickerField
                        label="תאריך שחרור"
                        value={dischargeDate}
                        onChange={setDischargeDate}
                        onBlur={() => handleBlur('dischargeDate')}
                        touched={touched['dischargeDate']}
                        error={!!errors?.dischargeDate && (touched['dischargeDate'] || touched['status'])}
                        helperText={(touched['dischargeDate'] || touched['status']) ? errors?.dischargeDate : ''}
                        required
                    />
                </Grid>
            </Grid>
            <LabelledSelect<string>
                label="דרגת שחרור"
                value={releaseRank}
                onChange={(val) => {
                    setReleaseRank(val);
                    handleBlur('releaseRank');
                }}
                touched={touched['releaseRank']}
                required
                options={RANK_OPTIONS}
            />
        </Stack>
    );
}
