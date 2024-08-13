/* eslint-disable @typescript-eslint/no-explicit-any */
type StorageHandlerFunction = {
    (key: string): any;
    (key: string, value: any): void;
};

class StorageHandler {
    private _keySymbol: symbol;

    constructor() {
        // Using Symbol to create a private key
        this._keySymbol = Symbol('key');
    }

    // Setter method to store key-value pair in localStorage
    set storageItem({ key, value }: { key: string; value: any }) {
        if (typeof key !== 'string') {
            throw new Error('Key must be a string');
        }
        // Storing the key in the instance using Symbol to make it private
        (this as any)[this._keySymbol] = key;
        // Storing the value in localStorage (stringify if it's an object)
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    }

    // Getter method to retrieve value from localStorage using the private key
    get storageItem(): any {
        const key = (this as any)[this._keySymbol];
        if (!key) {
            throw new Error('No key set in storage');
        }
        const value = localStorage.getItem(key);
        try {
            return JSON.parse(value as string);
        } catch (e) {
            return value;
        }
    }

    // Method to get value directly from localStorage
    getValue(key: string): any {
        const value = localStorage.getItem(key);
        try {
            return JSON.parse(value as string);
        } catch (e) {
            return value;
        }
    }
}

// Create a single instance of StorageHandler
const storageHandler = new StorageHandler();

// Create a proxy function to intercept function calls
const storageHandlerFunction: StorageHandlerFunction = (key: string, value?: any): any => {
    if (value === undefined) {
        // Get operation
        return storageHandler.getValue(key);
    } else {
        // Set operation
        storageHandler.storageItem = { key, value };
    }
};

export const handler = new Proxy(storageHandlerFunction, {
    apply(target, thisArg, args: [string, any?]) {
        return target(args[0], args[1]);
    }
});

