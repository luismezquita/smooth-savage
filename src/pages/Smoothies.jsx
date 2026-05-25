import React from 'react';
import { smoothies } from '../data/smoothies';
import SmoothieCard from '../components/SmoothieCard';
import { useT } from '../i18n/LanguageContext';

export default function Smoothies() {
    const t = useT();

    return (
        <div className="min-h-[100dvh] w-full bg-fruit-dark overflow-x-hidden">

            {/* HERO */}
            <div className="flex h-[calc(100dvh-8rem)] flex-col md:h-[calc(100dvh-5rem)]">

                {/* Imagen */}
                <div className="min-h-0 flex-1 overflow-hidden">
                    <img
                        src="/images/smoothies/smooth_savage.jpg"
                        alt="Savage Smoothies"
                        className="w-full h-full object-cover object-[50%_25%]"
                    />
                </div>

                {/* Slogan */}
                <div className="w-full flex-shrink-0 px-4 py-6 text-center bg-fruit-dark">
                    <p
                        className="font-black italic text-4xl leading-tight"
                        style={{ color: '#F5E6C8' }}
                    >
                        {t('smoothies.slogan1')}
                    </p>

                    <p
                        className="font-black italic text-4xl leading-tight"
                        style={{
                            background: 'linear-gradient(90deg, #F97316, #ef4444)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        {t('smoothies.slogan2a')}{t('smoothies.slogan2b')}
                    </p>
                </div>
            </div>

            {/* CATÁLOGO */}
            <div className="px-4 py-8 max-w-7xl mx-auto pb-24">
                <h2 className="text-3xl font-bold mb-6 text-white">
                    {t('smoothies.allHeading')}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {smoothies.map((smoothie, i) => (
                        <SmoothieCard
                            key={smoothie.id}
                            smoothie={smoothie}
                            index={i}
                            locked={i >= 8}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
