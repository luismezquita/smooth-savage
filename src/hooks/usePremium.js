import { useEffect, useState } from 'react';
import {
    FREE_BENEFITS_COUNT,
    FREE_FRESH_COUNT,
    FREE_SAVAGE_COUNT,
    FREE_SMOOTHIES_COUNT,
} from '../utils/premiumAccess';

const PREMIUM_KEY = 'ss_premium';
const PREMIUM_EVENT = 'ss-premium-update';

export function usePremium() {
    // TODO: conectar con RevenueCat cuando se integren los pagos reales
    // TODO: conectar con RevenueCat cuando se integren los pagos reales
    const [isPremium, setIsPremium] = useState(() => localStorage.getItem(PREMIUM_KEY) === 'true');

    useEffect(() => {
        const syncPremium = () => {
            setIsPremium(localStorage.getItem(PREMIUM_KEY) === 'true');
        };

        window.addEventListener(PREMIUM_EVENT, syncPremium);
        window.addEventListener('storage', syncPremium);
        return () => {
            window.removeEventListener(PREMIUM_EVENT, syncPremium);
            window.removeEventListener('storage', syncPremium);
        };
    }, []);

    const unlock = () => {
        localStorage.setItem(PREMIUM_KEY, 'true');
        setIsPremium(true);
        window.dispatchEvent(new Event(PREMIUM_EVENT));
    };

    const togglePremium = () => {
        const newValue = !isPremium;
        localStorage.setItem(PREMIUM_KEY, newValue.toString());
        setIsPremium(newValue);
        window.dispatchEvent(new Event(PREMIUM_EVENT));
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
