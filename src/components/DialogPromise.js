import Vue from 'vue';
import VueI18n from "vue-i18n";
import dlogI18n from "../i18n";
import SimpleDialog from './SimpleDialog';
import SimpleSnackbar from './SimpleSnackbar';

const _SimpleDialog = Vue.extend( SimpleDialog );
const _SimpleSnackbar = Vue.extend( SimpleSnackbar );
const defaults = {
};
/**
 * Vue instance controlling i18n.
 */
let vue;
/**
 * Show a dialog of type "alert", "confirm", or "prompt." Returned promise is resolved with the dialog result when the
 * user dismisses or completes it. Message can be a string or an Object with the following properties:
 *
 * title : {string},
 * text : {string},
 * acceptText : {string}
 * cancelText : {string}
 *
 *
 * @param type {string<"alert","confirm","prompt">}
 * @param message {string|Object}
 * @returns {Promise<any>}
 * @private
 */
function _showDialog( type, message )
{
    return new Promise( ( resolve, reject ) =>
    {
        let dlog;
        new Promise( _resolve =>
        {
            if( typeof message === "string" )
            {
                message = {
                    title : "",
                    text : message
                };
            }
            const _message = {};
            Object.assign( _message, defaults, message );
            dlog = new _SimpleDialog( {
                propsData : {
                    type : type,
                    message : _message,
                    resolve : _resolve
                }
            } );
            dlog.$mount();
        } ).then( result =>
        {
            setTimeout( () => dlog.$destroy, 300 );
            if( result === false )
            {
                reject();
            }
            else
            {
                resolve( result );
            }
        } );
    } );
}

/**
 * Show a snackbar with the default color and message. If message is an Object, it controls the properties of the
 * snackbar:
 *
 * text : {string}
 * color : {string}
 * snackbarTimeout {integer}
 * snackbarX : {string<"left"|"right">}
 * snackbarY : {string<"top"|"bottom">}
 *
 * @param color
 * @param message
 * @private
 */
function _showSnackbar( color, message )
{
    if( typeof message === "string" )
    {
        message = {
            text : message
        }
    }
    const _message = {
        color : color
    };
    Object.assign( _message, defaults, message );
    const sbar = new _SimpleSnackbar( {
        propsData : _message
    } );
    const dNode = document.getElementById( defaults.snackbarParent ).appendChild( document.createElement( "div" ) );
    sbar.$mount( dNode );
    sbar.show();
    sbar.$on( "close", () =>
    {
        sbar.$destroy();
    } );
}

/**
 * Plugin which provides the following methods for use in components:
 *
 * $alert( message ).then( result => handler )
 * $confirm( message ).then( result => handler )
 * $prompt( message ).then( result => handler )
 * $inform( message )
 * $warn( message )
 * $error( message )
 *
 * See DialogPromiseDemo in this module for full documentation.
 *
 * @type {{install(*, *=): void, name: string}}
 */
const DialogPromise = {
    name : "DialogPromise",
    /**
     * Options:
     * - snackbarParent : {string}, default "app" - ID of element under which snackbars will be mounted.
     * - locale : {string}, default "en" - Locale identifier
     *
     * @param Vue {Vue}
     * @param options {object}
     */
    install( Vue, options )
    {
        options = options || {};
        Vue.use( VueI18n );
        const i18n = new VueI18n( {
            locale : options.locale || "en",
            fallbackLocale : "en",
            messages : dlogI18n
        } );
        vue = new Vue( { i18n } );
        Object.assign( defaults, {
            acceptText : vue.$t( "message.Accept" ),
            cancelText : vue.$t( "message.Cancel" ),
            closeText : vue.$t( "message.Close" ),
            snackbarX : "right",
            snackbarY : "top",
            snackbarTimeout : 3000,
            dialogMaxWidth : 500,
            snackbarParent : "app"
        }, options );
        Vue.prototype.$alert = _showDialog.bind( this, "alert" );
        Vue.prototype.$confirm = _showDialog.bind( this, "confirm" );
        Vue.prototype.$prompt = _showDialog.bind( this, "prompt" );
        Vue.prototype.$inform = _showSnackbar.bind( this, "info" );
        Vue.prototype.$warn = _showSnackbar.bind( this, "warning" );
        Vue.prototype.$error = _showSnackbar.bind( this, "error" );
    }
};
export default DialogPromise;
