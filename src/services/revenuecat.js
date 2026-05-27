import { Capacitor } from '@capacitor/core';

const RC_ANDROID_PUBLIC_KEY =
    import.meta.env.VITE_RC_ANDROID_PUBLIC_KEY || 'goog_hvtqDSjKyVttTkvvBFuAMLKJiJx';
const RC_ENTITLEMENT_ID = import.meta.env.VITE_RC_ENTITLEMENT_ID || 'premium';

let purchasesSdk = null;
let isInitialized = false;

function isNativeAndroid() {
    return Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';
}

async function getSdk() {
    if (purchasesSdk) return purchasesSdk;
    try {
        const moduleName = '@revenuecat/purchases-capacitor';
        const mod = await import(/* @vite-ignore */ moduleName);
        purchasesSdk = mod?.Purchases || mod?.default || null;
        return purchasesSdk;
    } catch {
        return null;
    }
}

export async function initRevenueCat() {
    if (!isNativeAndroid()) return false;
    if (isInitialized) return true;
    const sdk = await getSdk();
    if (!sdk || !RC_ANDROID_PUBLIC_KEY) return false;
    await sdk.configure({ apiKey: RC_ANDROID_PUBLIC_KEY });
    isInitialized = true;
    return true;
}

function hasPremiumEntitlement(customerInfo) {
    const ent = customerInfo?.entitlements?.active || {};
    return Boolean(ent[RC_ENTITLEMENT_ID]);
}

export async function fetchIsPremiumFromStore() {
    const ok = await initRevenueCat();
    if (!ok) return null;
    const info = await purchasesSdk.getCustomerInfo();
    return hasPremiumEntitlement(info);
}

export async function purchasePremiumFromStore() {
    const ok = await initRevenueCat();
    if (!ok) throw new Error('Store purchase unavailable');

    const offerings = await purchasesSdk.getOfferings();
    const current = offerings?.current;
    if (!current) throw new Error('No current offering in RevenueCat');

    const oneTimeProduct =
        (current.availablePackages || []).find((p) => p?.product?.identifier === 'premium_unlock') ||
        (current.availablePackages || [])[0];

    if (!oneTimeProduct) throw new Error('No purchasable package found');

    const { customerInfo } = await purchasesSdk.purchasePackage({
        aPackage: oneTimeProduct,
    });

    return hasPremiumEntitlement(customerInfo);
}

export async function restorePremiumFromStore() {
    const ok = await initRevenueCat();
    if (!ok) throw new Error('Store restore unavailable');
    const info = await purchasesSdk.restorePurchases();
    return hasPremiumEntitlement(info);
}
