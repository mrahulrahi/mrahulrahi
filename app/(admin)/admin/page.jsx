import { cookies } from 'next/headers';
import LoginView from '@/app/components/admin/LoginView';
import AdminClient from './AdminClient';

export default async function AdminPage() {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.has('admin_auth_session');

    if (!isAuthenticated) {
        return <LoginView />;
    }

    return <AdminClient />;
}
