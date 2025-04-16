// apps/nfo/src/App.tsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

const router = createBrowserRouter(routes);

export default function App() {
    return <RouterProvider router={router} />;
}