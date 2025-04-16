import { RouteObject } from 'react-router-dom';
import SceneRelease from '@/components/SceneRelease/SceneRelease';
import NotFound from '@/pages/NotFound'; // create this if needed
import RootLayout from '@/Layout';
import OracleTunerPage from "@/pages/OracleTunerPage.tsx";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <SceneRelease /> },
            { path: 'oracle-tuner', element: <OracleTunerPage /> },
            { path: '*', element: <NotFound /> },
        ],
    },
];