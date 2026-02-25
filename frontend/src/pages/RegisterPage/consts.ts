import { SelectOption } from '../../components/LabelledSelect';

export type Status = '' | 'recruit' | 'serving' | 'released' | 'other';

export const STATUS_OPTIONS: SelectOption<Status>[] = [
    { value: 'recruit', label: 'מלש"בית' },
    { value: 'serving', label: 'חיילת בשירות' },
    { value: 'released', label: 'משוחררת' },
    { value: 'other', label: 'אחר' }
];

export const RANK_OPTIONS: SelectOption<string>[] = [
    { value: 'טוראי', label: 'טוראי' },
    { value: 'רב״ט', label: 'רב״ט' },
    { value: 'סמל', label: 'סמל' },
    { value: 'סמ״ר', label: 'סמ״ר' },
    { value: 'נגד', label: 'דרגות נגדים' },
    { value: 'קצין', label: 'דרגות קצונה' }
];

export const CONNECTION_OPTIONS: SelectOption<string>[] = [
    { value: 'parent', label: 'אמא/אבא' },
    { value: 'grandparent', label: 'סבא/סבתא' },
    { value: 'partner', label: 'בן/בת זוג' },
    { value: 'combat soldier', label: 'לוחמים שמעריכים תצפי' },
    { value: 'other', label: 'סתם הקהילה נכנסה לי ללב:)' }
];
