import { SxProps, Theme } from '@mui/material';

export const paperStyles: SxProps<Theme> = {
    width: '100%',
    maxWidth: 820,
    px: { xs: 3, sm: 6 },
    py: { xs: 4, sm: 6 },
    borderRadius: '28px'
};

export const containerStyles: SxProps<Theme> = {
    display: 'flex',
    flexDirection: { xs: 'column-reverse', md: 'row' },
    gap: 4,
    width: '100%',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
};

export const getDynamicColumnStyles = (status: string): SxProps<Theme> => ({
    flex: status ? '1 1 50%' : '0 0 0%',
    maxWidth: status ? '50%' : '0px',
    opacity: status ? 1 : 0,
    visibility: status ? 'visible' : 'hidden',
    overflow: 'hidden',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    display: { xs: status ? 'block' : 'none', md: 'block' }
});

export const dynamicBoxStyles: SxProps<Theme> = {
    height: '100%',
    p: 3,
    borderRadius: '20px',
    background: 'rgba(248, 250, 252, 0.5)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    minWidth: '320px'
};

export const getBasicColumnStyles = (status: string): SxProps<Theme> => ({
    flex: status ? '1 1 50%' : '1 1 100%',
    maxWidth: status ? '50%' : '520px',
    mx: status ? 0 : 'auto',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
});
