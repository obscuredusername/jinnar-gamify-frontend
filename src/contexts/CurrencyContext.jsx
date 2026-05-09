import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import viralService from '../services/viralService';

// Supported currencies with their metadata
export const SUPPORTED_CURRENCIES = [
    { code: 'USD', symbol: '$',   name: 'US Dollar',         flag: '🇺🇸' },
    { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling', flag: '🇹🇿' },
    { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling',    flag: '🇰🇪' },
    { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling',   flag: '🇺🇬' },
    { code: 'RWF', symbol: 'Fr',  name: 'Rwandan Franc',      flag: '🇷🇼' },
    { code: 'ZAR', symbol: 'R',   name: 'South African Rand', flag: '🇿🇦' },
];

// Fallback rates in case the API is unavailable
const FALLBACK_RATES = {
    USD: 1,
    TZS: 2580,
    KES: 130,
    UGX: 3750,
    RWF: 1350,
    ZAR: 18.5,
};

const CurrencyContext = createContext(null);

export const CurrencyProvider = ({ children }) => {
    const [activeCurrency, setActiveCurrency] = useState(() => {
        return localStorage.getItem('jinnar_currency') || 'USD';
    });
    const [rates, setRates] = useState(FALLBACK_RATES);
    const [isLoadingRates, setIsLoadingRates] = useState(true);

    const fetchRates = useCallback(async () => {
        try {
            setIsLoadingRates(true);
            const data = await viralService.getFxRates();
            if (data?.rates) {
                setRates({ USD: 1, ...data.rates });
            }
        } catch (err) {
            // Silently fall back to hardcoded rates
            console.warn('[CurrencyContext] Could not fetch FX rates, using fallback.', err);
        } finally {
            setIsLoadingRates(false);
        }
    }, []);

    useEffect(() => {
        fetchRates();
    }, [fetchRates]);

    const switchCurrency = useCallback((code) => {
        setActiveCurrency(code);
        localStorage.setItem('jinnar_currency', code);
    }, []);

    /**
     * Convert a USD amount to the active currency
     * @param {number} usdAmount - Amount in USD
     * @returns {number}
     */
    const convert = useCallback((usdAmount) => {
        const rate = rates[activeCurrency] ?? 1;
        return usdAmount * rate;
    }, [activeCurrency, rates]);

    /**
     * Format a USD amount in the active currency with symbol
     * @param {number} usdAmount
     * @returns {string} e.g. "TSh 25,800"
     */
    const format = useCallback((usdAmount) => {
        if (usdAmount == null || isNaN(usdAmount)) return '—';
        const currency = SUPPORTED_CURRENCIES.find(c => c.code === activeCurrency);
        const converted = convert(usdAmount);
        const formatted = converted.toLocaleString('en-US', {
            minimumFractionDigits: activeCurrency === 'USD' ? 2 : 0,
            maximumFractionDigits: activeCurrency === 'USD' ? 2 : 0,
        });
        return `${currency?.symbol ?? '$'}${formatted}`;
    }, [activeCurrency, convert]);

    const activeCurrencyMeta = SUPPORTED_CURRENCIES.find(c => c.code === activeCurrency);

    return (
        <CurrencyContext.Provider value={{
            activeCurrency,
            activeCurrencyMeta,
            rates,
            isLoadingRates,
            switchCurrency,
            convert,
            format,
            supportedCurrencies: SUPPORTED_CURRENCIES,
        }}>
            {children}
        </CurrencyContext.Provider>
    );
};

/**
 * Hook to consume the currency context.
 * Returns a safe fallback if used outside a provider (e.g. during SSR or testing).
 * @returns {{ activeCurrency, activeCurrencyMeta, rates, switchCurrency, convert, format, supportedCurrencies }}
 */
export const useCurrency = () => {
    const ctx = useContext(CurrencyContext);
    if (!ctx) {
        // Graceful fallback — return USD defaults so the app doesn't crash
        return {
            activeCurrency: 'USD',
            activeCurrencyMeta: SUPPORTED_CURRENCIES[0],
            rates: FALLBACK_RATES,
            isLoadingRates: false,
            switchCurrency: () => {},
            convert: (amount) => amount,
            format: (amount) => `$${(amount ?? 0).toLocaleString()}`,
            supportedCurrencies: SUPPORTED_CURRENCIES,
        };
    }
    return ctx;
};

export default CurrencyContext;
