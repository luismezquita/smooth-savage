import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import FruitDetail from './pages/FruitDetail';
import SuperfoodDetail from './pages/SuperfoodDetail';
import Superfoods from './pages/Superfoods';
import SmoothieDetail from './pages/SmoothieDetail';
import Smoothies from './pages/Smoothies';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Benefits from './pages/Benefits';
import BenefitDetail from './pages/BenefitDetail';
import { ThemeProvider } from './hooks/useTheme';

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/superfoods" element={<Superfoods />} />
                        <Route path="/smoothies" element={<Smoothies />} />

                        {/* Details */}
                        <Route path="/fruit/:id" element={<FruitDetail />} />
                        <Route path="/superfood/:id" element={<SuperfoodDetail />} />
                        <Route path="/smoothie/:id" element={<SmoothieDetail />} />

                        {/* Others */}
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/benefits" element={<Benefits />} />
                        <Route path="/benefits/:id" element={<BenefitDetail />} />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
