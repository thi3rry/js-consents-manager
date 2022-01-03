
const prefix = 'ssd-storage--';

const isInt = (n) => Number(n) === n && n % 1 === 0;
const isFloat = (n) => Number(n) === n && n % 1 !== 0;

export default class SsdStorage {
    type = 'localstorage';
    values = {};
    constructor(_type = 'localstorage') {
        this.type = _type;
        this.refreshFromStorage();
    }

    setType(_type = 'localstorage') {
        this.type = _type;
        this.load();
    }



    setItem(key, value) {
        this.values[key] = value;
        this.saveSingle(key);
    }

    getItem(key, defaultValue = null) {
        const cast = typeof defaultValue;
        if (this.values[key]) {
            if (cast === "boolean") {
                return Boolean(this.values[key]);
            }
            if (cast === "string") {
                return String(this.values[key]);
            }
            if (cast === "number" && isInt(defaultValue)) {
                return parseInt(this.values[key]+'', 10);
            }
            if (cast === "number" && isFloat(defaultValue)) {
                return parseFloat(this.values[key]+'');
            }
            return this.values[key];
        }
        return defaultValue;
    }

    removeItem(key) {
        if (this.values[key]) {
            delete this.values[key];
        }
        this.saveSingle(key);
    }

    getAll() {
        return this.values;
    }

    reset() {
        this.values = {};
    }

    refreshFromStorage() {
        this.reset();
        this.load();
    }

    load() {
        let keys = [];
        switch (this.type) {
            default:
            case 'localstorage':
                keys = Object.keys(localStorage).filter((key) => {
                    return key.startsWith(prefix);
                });

                break;
        }
        let i = keys.length;

        while ( i-- ) {
            this.loadSingle(keys[i].replace(prefix, ''));
        }
    }
    loadSingle(key) {
        switch (this.type) {
            default:
            case 'localstorage':
                this.values[key] = JSON.parse(window.localStorage.getItem(prefix+key));
                break;
        }

        return this.getItem(key);
    }

    saveSingle(key) {
        let val = this.values[key]
        switch (this.type) {
            default:
            case 'localstorage':
                if (this.values[key] === undefined) {
                    window.localStorage.removeItem(prefix+key);
                }
                else {
                    val = JSON.stringify(val);
                    window.localStorage.setItem(prefix+key, val);
                }
                break;
        }
        return this.getItem(key);
    }

    save() {
        Object.values(this.values).forEach((val, index) => {
            this.saveSingle(index, val);
        });
    }
}
export const setItem = () => {

}
