# WANHUA UI2

Based On [Vuetify](https://www.npmjs.com/package/vuetify), and make a framework above it, to package some logics and css styles.
 
add these components:

datepicker, timepicker, loading, pagination, table;
app, areapanels and areapanel, card, container, layout, dialog, drawer, footer, list, topbar;
button, checkbox, hyperlink, icon, img, logo, menu, moneyfield, numberfield, radio, select, tab, textarea, textfield, timeline, treeview.

Based on [Vue CLI](https://cli.vuejs.org/) and [Vuetify](https://www.npmjs.com/package/vuetify).

## Features

Full description and more examples accessible from home page served by `npm run serve`.

## Configurable properties

Various properties can be configured by handing them to Vue.use in the `options` argument when installing the plugin. 
(see **Usage examples** below). 

All of these are optional and have defaults:

* `locale` 
    - Locale for the button labels. Over 30 locales are supported. To override, see the properties below.
* `acceptText` 
    - Label for accept button in dialog
* `cancelText` 
    - Label for cancel button in dialog
* `closeText` 
    - Label for close button in snackbar message
* `snackbarX` 
    - Position of snackbar message: "left" or "right"
* `snackbarY` 
    - Position of snackbar message: "top" or "bottom"
* `snackbarTimeout` 
    - Snackbar duration in milliseconds
* `dialogMaxWidth` 
    - Max width of dialog in pixels
* `snackbarParent` 
    - ID of parent node in which the dialogs are mounted, default is "app"

## Usage examples

To install and configure the plugin:

```
import Vue from "vue";
import DialogPromise from "vuetify-dialog-promise";

Vue.use( DialogPromise, {
    locale : "fi",
    snackbarX : "left",
    snackbarY : "bottom"
} );
```

To use the plugin from inside your own component:

```
// Message with defaults
this.$alert( "Your mother is a hamster and your father smells of elderberries." );

// Confirmation with property overrides
this.$confirm( { 
    title : "Are you a witch?", 
    text : "Do you weigh less than a duck?", 
    acceptText : "I float", 
    cancelText : "I sink"
 } ).then( y => this.burnTheWitch() ).catch( n => this.notAWitch() );
 
// Prompt for value
this.$prompt( "What is your quest?" ).then( quest => 
    this.beginQuest( quest ).catch( n => {} );
    
// Snackbar notification with defaults    
this.$inform( "We are the knights that say Ni." );

// Snackbar notification with overrides
this.$inform( { text : "My favourite colour is blue.", color : "blue" } );
```

If used in a Vue-CLI project, this will be baked into your layer without you having to do anything.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
