import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';

import { supabase } from '../supabaseClient';
import { Navbar } from '../components/Navbar';
import { APP_COLORS } from '../theme';

export default function MainLayout() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        let mounted = true;

        supabase.auth.getSession().then(({ data }) => {
            if (!mounted) return;
            setSession(data.session ?? null);
        });

        const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
        });

        return () => {
            mounted = false;
            data.subscription.unsubscribe();
        };
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <Box
            dir="rtl"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                background: APP_COLORS.background
            }}
        >
            <Navbar isAuthed={!!session} onSignOut={handleSignOut} />

            <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Outlet />
            </Box>
        </Box>
    );
}