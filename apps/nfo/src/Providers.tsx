import { ThemeProvider } from './theme/ThemeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
    return <ThemeProvider>{children}</ThemeProvider>;
}