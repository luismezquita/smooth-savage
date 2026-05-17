import { useState } from 'react';

const PREMIUM_KEY = 'ss_premium';

export const FREE_SMOOTHIES_COUNT = 8;
export const FREE_FRESH_COUNT = 16;
export const FREE_SAVAGE_COUNT = 7;
export const FREE_BENEFITS_COUNT = 2;

export function usePremium() {
    // TODO: conectar con RevenueCat cuando se integren los pagos reales
    // TODO: conectar con RevenueCat cuando se integren los pagos reales
    const [isPremium, setIsPremium] = useState(() => localStorage.getItem(PREMIUM_KEY) === 'true');

    const unlock = () => {
        localStorage.setItem(PREMIUM_KEY, 'true');
        setIsPremium(true);
    };

    const togglePremium = () => {
        const newValue = !isPremium;
        localStorage.setItem(PREMIUM_KEY, newValue.toString());
        setIsPremium(newValue);
    };

    return {
        isPremium,
        unlock,
        togglePremium,
        FREE_SMOOTHIES_COUNT,
        FREE_FRESH_COUNT,
        FREE_SAVAGE_COUNT,
        FREE_BENEFITS_COUNT,
    };
}
