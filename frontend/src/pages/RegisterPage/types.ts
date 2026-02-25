import { Dayjs } from 'dayjs';
import { Status } from './consts';

export type TouchedState = Record<string, boolean>;

export type HandleBlur = (field: string) => void;

export interface RecruitFieldsProps {
    recruitDate: Dayjs | null;
    setRecruitDate: (val: Dayjs | null) => void;
    touched: TouchedState;
    handleBlur: HandleBlur;
    errors?: { recruitDate?: string };
}

export interface ServingFieldsProps {
    sector: string;
    setSector: (val: string) => void;
    hamalUnit: string;
    setHamalUnit: (val: string) => void;
    recruitDate: Dayjs | null;
    setRecruitDate: (val: Dayjs | null) => void;
    dischargeDate: Dayjs | null;
    setDischargeDate: (val: Dayjs | null) => void;
    releaseRank: string;
    setReleaseRank: (val: string) => void;
    touched: TouchedState;
    handleBlur: HandleBlur;
    errors?: { recruitDate?: string; dischargeDate?: string };
}

export interface ReleasedFieldsProps extends ServingFieldsProps {
    activeReserve: boolean;
    setActiveReserve: (val: boolean) => void;
}

export interface OtherFieldsProps {
    connection: string;
    setConnection: (val: string) => void;
    touched: TouchedState;
    handleBlur: HandleBlur;
}

export interface BasicInfoFieldsProps {
    username: string;
    setUsername: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    phoneNumber: string;
    setPhoneNumber: (val: string) => void;
    status: Status;
    setStatus: (val: Status) => void;
    password: string;
    setPassword: (val: string) => void;
    confirmPassword: string;
    setConfirmPassword: (val: string) => void;
    isNewsletter: boolean;
    setIsNewsletter: (val: boolean) => void;
    showPassword: boolean;
    setShowPassword: (val: boolean) => void;
    showConfirmPassword: boolean;
    setShowConfirmPassword: (val: boolean) => void;
    touched: TouchedState;
    handleBlur: HandleBlur;
    isValidEmail: boolean;
    isValidPhone: boolean;
    passwordsMatch: boolean;
}
