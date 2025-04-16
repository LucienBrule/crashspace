import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OracleTuner from '@/pages/OracleTuner';
import SceneRelease from '@/components/SceneRelease/SceneRelease';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<SceneRelease />} />
                <Route path="/oracle-tuner" element={<OracleTuner />} />
            </Routes>
        </BrowserRouter>
    );
}