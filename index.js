import DialogPromise from "./src/DialogPromise";
const WHUIPlugin = {
    install(Vue, options) {
        // TODO do something...
    },
    DialogPromise
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(WHUIPlugin)
}
export default WHUIPlugin;