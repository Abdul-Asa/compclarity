import { atom, useAtom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

type StorageType = 'localStorage' | 'sessionStorage';

/**
 * Creates a custom storage object that handles serialization/deserialization
 * and supports both localStorage and sessionStorage
 */
const createCustomStorage = (storageType: StorageType = 'localStorage') => {
  const storage = createJSONStorage<unknown>(() => 
    storageType === 'localStorage' ? localStorage : sessionStorage
  );
  
  return storage;
};

/**
 * Custom hook to create a persistent atom with localStorage/sessionStorage
 * 
 * @param key - The key to store the value under in storage
 * @param initialValue - The initial value if nothing exists in storage
 * @param storageType - Which storage to use ('localStorage' or 'sessionStorage')
 * @returns A tuple containing the current value and a setter function
 * 
 * @example
 * const [value, setValue] = useLocalStorage('theme', 'light');
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  storageType: StorageType = 'localStorage'
) => {
  // Create an atom with storage persistence
  const baseAtom = atomWithStorage(
    key,
    initialValue,
    createCustomStorage(storageType)
  );

  // Create a derived atom that handles undefined values
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: T | ((prev: T) => T)) => {
      const nextValue = typeof update === 'function'
        ? (update as (prev: T) => T)(get(baseAtom) as T)
        : update;
      set(baseAtom, nextValue);
    }
  );

  return useAtom(derivedAtom);
};

/**
 * Creates a standalone atom with localStorage persistence
 * 
 * @param key - The key to store the value under in localStorage
 * @param initialValue - The initial value if nothing exists in storage
 * @returns An atom that persists to localStorage
 * 
 * @example
 * const themeAtom = atomWithLocalStorage('theme', 'light');
 */
export const atomWithLocalStorage = <T>(key: string, initialValue: T) => {
  return atomWithStorage(
    key,
    initialValue,
    createCustomStorage('localStorage')
  );
};