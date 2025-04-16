import { Outlet } from 'react-router';
import NavBar from '@/components/Navigation/NavBar';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

export default function Layout() {
    return (
        <div className="relative min-h-screen">
            <NavBar />
            <ThemeToggle />
            <Outlet />
        </div>
    );
}