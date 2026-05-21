import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import FruitDetail from './pages/FruitDetail';
import SuperfoodDetail from './pages/SuperfoodDetail';
import Savage from './pages/Savage';
import SmoothieDetail from './pages/SmoothieDetail';
import Smoothies from './pages/Smoothies';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Benefits from './pages/Benefits';
import BenefitDetail from './pages/BenefitDetail';
import Info from './pages/Info';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { ThemeProvider } from './hooks/useTheme';
import { LanguageProvider } from './i18n/LanguageContext';
import WelcomePage from './WelcomePage';

function App() {
    return (
        <LanguageProvider>
        <ThemeProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<WelcomePage />} />
                        <Route path="/fresh" element={<Home />} />
                        <Route path="/savage" element={<Savage />} />
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

                        <Route path="/info" element={<Info />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
        </LanguageProvider>
    );
}

export default App;