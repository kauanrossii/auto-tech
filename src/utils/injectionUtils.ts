import { getCurrentInstance, inject, type InjectionKey } from "vue";

export function injectStrict<T>(key: InjectionKey<T>): T {
    const resolved = inject(key);
    if (!resolved) {
        throw new Error(`Não foi possível resolver ${key.description}`);
    }

    return resolved;
}

export function injectStrictWithSelf<T>(key: InjectionKey<T>): T {
    const vm = getCurrentInstance() as any;
    return vm?.provides[key as any] || injectStrict(key);
}