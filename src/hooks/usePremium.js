import { useEffect, useState } from 'react';
import {
    FREE_BENEFITS_COUNT,
    FREE_FRESH_COUNT,
    FREE_SAVAGE_COUNT,
    FREE_SMOOTHIES_COUNT,
} from '../utils/premiumAccess';
import {
    fetchIsPremiumFromStore,
    purchasePremiumFromStore,
    restorePremiumFromStore,
} from '../services/revenuecat';

const PREMIUM_KEY = 'ss_premium';
const PREMIUM_EVENT = 'ss-premium-update';

export function usePremium() {
    const [isPremium, setIsPremium] = useState(() => localStorage.getItem(PREMIUM_KEY) === 'true');
    const [isPurchasing, setIsPurchasing] = useState(false);
    const [premiumError, setPremiumError] = useState('');

    useEffect(() => {
        let cancelled = false;

        const syncFromStore = async () => {
            try {
                const storePremium = await fetchIsPremiumFromStore();
                if (cancelled || storePremium === null) return;
                localStorage.setItem(PREMIUM_KEY, storePremium ? 'true' : 'false');
                setIsPremium(storePremium);
            } catch {
                // noop: fallback local
            }
        };

        syncFromStore();

        const syncPremium = () => {
            setIsPremium(localStorage.getItem(PREMIUM_KEY) === 'true');
        };

        window.addEventListener(PREMIUM_EVENT, syncPremium);
        window.addEventListener('storage', syncPremium);
        return () => {
            cancelled = true;
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

    const purchasePremium = async () => {
        setPremiumError('');
        setIsPurchasing(true);
        try {
            const purchased = await purchasePremiumFromStore();
            if (!purchased) {
                throw new Error('Purchase did not grant premium entitlement');
            }
            localStorage.setItem(PREMIUM_KEY, 'true');
            setIsPremium(true);
            window.dispatchEvent(new Event(PREMIUM_EVENT));
            return true;
        } catch (err) {
            setPremiumError(err?.message || 'Purchase failed');
            return false;
        } finally {
            setIsPurchasing(false);
        }
    };

    const restorePremium = async () => {
        setPremiumError('');
        setIsPurchasing(true);
        try {
            const restored = await restorePremiumFromStore();
            localStorage.setItem(PREMIUM_KEY, restored ? 'true' : 'false');
            setIsPremium(restored);
            window.dispatchEvent(new Event(PREMIUM_EVENT));
            return restored;
        } catch (err) {
            setPremiumError(err?.message || 'Restore failed');
            return false;
        } finally {
            setIsPurchasing(false);
        }
    };

    return {
        isPremium,
        isPurchasing,
        premiumError,
        unlock,
        togglePremium,
        purchasePremium,
        restorePremium,
        FREE_SMOOTHIES_COUNT,
        FREE_FRESH_COUNT,
        FREE_SAVAGE_COUNT,
        FREE_BENEFITS_COUNT,
    };
}
