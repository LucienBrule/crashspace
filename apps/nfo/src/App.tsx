import './App.css'
import SceneRelease from '@/components/SceneRelease/SceneRelease'
import { ThemeProvider } from './theme/ThemeProvider'
import Layout from "@/Layout";

function App() {
    return (
        <ThemeProvider>
            <div className="min-h-screen w-full">
                <Layout>
                    <div className="app-container">
                        <SceneRelease />
                    </div>
                </Layout>
            </div>
        </ThemeProvider>
    )
}

export default App