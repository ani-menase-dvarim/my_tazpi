import dayjs, { Dayjs } from 'dayjs';
import { Status } from './consts';

export const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone: string) => {
    return /^[\d\-\+\(\)\s]{9,}$/.test(phone);
};

export interface ValidationStatus {
    isValid: boolean;
    errors: {
        recruitDate?: string;
        dischargeDate?: string;
    };
    message?: string; // Keep for backward compatibility or general messages
}

export const checkStatusFieldsValid = (
    status: Status,
    recruitDate: Dayjs | null,
    dischargeDate: Dayjs | null,
    sector: string,
    hamalUnit: string,
    releaseRank: string,
    connection: string
): ValidationStatus => {
    if (!status) return { isValid: false, errors: {} };

    const today = dayjs().startOf('day');
    const errors: ValidationStatus['errors'] = {};

    // 1. Calculate Date-Specific Errors (Independent of other fields)
    if (status === 'recruit' && recruitDate && !recruitDate.isAfter(today)) {
        errors.recruitDate = 'תאריך הגיוס חייב להיות בעתיד';
    }

    if (status === 'serving') {
        if (recruitDate && recruitDate.isAfter(today)) {
            errors.recruitDate = 'תאריך הגיוס לא יכול להיות בעתיד';
        }
        if (dischargeDate && !dischargeDate.isAfter(today)) {
            errors.dischargeDate = 'תאריך השחרור חייב להיות בעתיד';
        }
    }

    if (status === 'released') {
        if (recruitDate && recruitDate.isAfter(today)) {
            errors.recruitDate = 'תאריך הגיוס לא יכול להיות בעתיד';
        }
        if (dischargeDate && dischargeDate.isAfter(today)) {
            errors.dischargeDate = 'תאריך השחרור לא יכול להיות בעתיד';
        }
    }

    // 2. Calculate Overall Validity (All required fields filled + no date errors)
    let isFilled = false;
    if (status === 'recruit') {
        isFilled = !!recruitDate;
    } else if (status === 'serving' || status === 'released') {
        isFilled = !!sector && !!hamalUnit && !!recruitDate && !!dischargeDate && !!releaseRank;
    } else if (status === 'other') {
        isFilled = !!connection.trim();
    }

    const hasErrors = Object.keys(errors).length > 0;
    const isValid = isFilled && !hasErrors;

    return { isValid, errors };
};
