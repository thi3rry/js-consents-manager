import { createApp } from 'vue'
import App from './App.vue'
import ssdStorage from "./plugins/ssdStorage";
export const createRgpdApp = (el) => {
    if (typeof el === 'string') {
        el = document.querySelectorAll(el);
        const apps = [];
        el.forEach((uniqEl) => {
            apps.push(createRgpdApp(uniqEl));
        })
        return apps;
    }
    let options = {};
    try {
        options = {
            ...options,
            ...JSON.parse(el.dataset.ssdRgpdModal)
        };
    }
    catch (e) {
        console.warn('SSDRgpdModal: no options passed to initialize the rgpd modal', e);
    }
    options.defaultContent = el.innerHTML;
    console.log('dataset', el.dataset);
    console.log('rootProps', options);
    const app = createApp(App, options);
    app.use(ssdStorage, 'localstorage');
    app.mount(el)
    return [app];

}

const SSD = window.SSD || {};

SSD.createRgpdApp = createRgpdApp;


const rgpdLoaded = new CustomEvent('ssd-rgpd-loaded', {
    detail: {createRgpdApp}
});
window.dispatchEvent(rgpdLoaded);
