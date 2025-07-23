import { useMemo } from "react";

const useDebouncedFunction = <T extends unknown[]> (fn: (...args: T) => void, delay: number) => {
    const debounce = <T extends unknown[]>(func: (...args: T) => void, delay: number): { debouncedFn: (...args: T) => void; cancel: () => void; } => {
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const debouncedFn = (...args: T) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };

        const cancel = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        };

        return { debouncedFn, cancel };
    };

    return useMemo(() => debounce(fn, delay), [fn, delay]);
}

export { useDebouncedFunction };