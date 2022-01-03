import SsdStorage from "../SsdStorage";

export default {
    install: (app, {storageType = 'localstorage'}) => {
        const storage = new SsdStorage(storageType);
        app.config.globalProperties.$ssdStorage = storage;
    }
}
