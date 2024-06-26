// This widget definition will get combined into combined-widgets.js file along with all other widget definitions
// use of anonymous func ensures nothing here leaks into global scope



(function() {
  function wdgwayfinderpointscoe() {
    return {
      // Required, this will be used as the top level tag when it's dropped on the Canvas
      // use a custom prefix to so the name won't collide with other widgets
      elementTag: 'wdg-wayfinderpointscoe',

      // Text displayed for the widget in the Palette
      // This will also be the name of the icon in ide/images directory
      label: 'WayfinderPoints COE', 

      // category to assign the widget to, this value will be used by the
      // project definition to filter which widgets are valid for that type of project
      // Using ar places it in the 3D not the 2D widget collection
      category: 'ar',

      // list of groups this widget will be included in the widget palette
      // standard value are Containers, Input, and Other
      groups : ["COE Extension"],
      
      // avoids showing this widget in Studio; when duplicating this template, remove or change to true
      isVisibleInPalette: true,

      // List of properties that will be displayed in the widget properties panel once it's been dropped on the Canvas
      properties: [
        {
          name: 'incomingdata',
          label: 'Some Incoming data',
          datatype: 'json',
          default: {},
          isBindingTarget: true,
          isBindingSource: false,
          showInput: false
        },
        {
          name: 'secondincomingdata',
          label: 'Additional Incoming data',
          datatype: 'json',
          default: {},
          isBindingTarget: true,
          isBindingSource: false,
          showInput: false
        },
        {
          name: 'outgoingdata',
          label: 'some return data',
          datatype: 'string',
          default: '',
          isBindingTarget: false,
          isBindingSource: true,
          showInput: false
        },  
        {
          name: 'actionid',
          label: 'Some action ID',
          datatype: 'string',
          default: 'NoAction',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true,
          editor: 'select',
          options: [
            {label: 'BoundingBox Waypoint', value: "BoundingBoxWaypoint"},
            {label: 'No action', value: "NoAction"}
            ]
        },
        {
          name: 'autolaunch',
          label: 'Auto do start',
          datatype: 'boolean',
          default: false,
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'modelid',
          label: 'Model ID',
          datatype: 'string',
          default: 'model-1',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'modelx',
          label: 'Model x',
          datatype: 'string',
          default: '0',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'modely',
          label: 'Model y',
          datatype: 'string',
          default: '0',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'modelz',
          label: 'Model z',
          datatype: 'string',
          default: '0',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'modelrx',
          label: 'Model rx',
          datatype: 'string',
          default: '0',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'modelry',
          label: 'Model ry',
          datatype: 'string',
          default: '0',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'modelrz',
          label: 'Model rz',
          datatype: 'string',
          default: '0',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'modelscale',
          label: 'Model scale',
          datatype: 'Number',
          default: 1.0,
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'modelbounds',
          label: 'Model bounds',
          datatype: 'string',
          default: "",
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'usestructurebounds',
          label: 'Use Structure Bounds',
          datatype: 'boolean',
          default: "true",
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'endpointtext',
          label: 'Endpoint Text',
          datatype: 'string',
          default: '',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },

        {
          name: 'width',
          label: 'width',
          datatype: 'string',
          default: '40vw',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'height',
          label: 'height',
          datatype: 'string',
          default: '60vh',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'topoffset',
          label: 'top offset',
          datatype: 'string',
          default: '50px',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        },
        {
          name: 'leftoffset',
          label: 'left offset',
          datatype: 'string',
          default: '1px',
          isBindingTarget: true,
          isBindingSource: false,
          showInput: true
        }
      ],

       // List of services that will displayed in the widget properties panel
      services: [
        {
          name: 'start',
          label: 'Start'
        },
        {
          name: 'secondstart',
          label: 'Additional incoming Started'
        },
        {
          name: 'stop',
          label: 'Stop'
        }
      ],

      // List of events that will displayed in the widget properties panel
      events: [
        {
          name: 'clicked',
          label: 'Clicked'
        },
        {
          name: 'completed',
          label: 'Completed action'
        }
      ],


      dependencies: {
        files         : ['js/wayfinderpointscoe-ng.js','js/wayfinderpointscoe.js', 'js/matrix.js', 'images/wayfinderpointscoe_close.png' ,'images/wayfinderpointscoe_expand.png'],
        angularModules: ['wayfinderpointscoe-ng']
      },

      // HTML to render when the widget is dropped on the Canvas
      designTemplate: function () {
        return '<div class="wayfinderpointscoeWidget" style="display:none"></div>';
      },

      //
      // Been very careful with the syntax in this section
      // I'm following the use model others have defined and this pattern works
      // use {{ for incoming properties }}
      // use double quotes for " outgoing properties "
      // and always have a delegate-field="delegate" defined
      //
      runtimeTemplate: function (props) {
        var tmpl = '<div ng-wayfinderpointscoe  incomingdata-field="me.incomingdata" secondincomingdata-field="me.secondincomingdata"  outgoingdata-field="me.outgoingdata" actionid-field={{me.actionid}} autolaunch-field={{me.autolaunch}}  modelid-field={{me.modelid}}  modelx-field={{me.modelx}}  modely-field={{me.modely}} modelz-field={{me.modelz}} modelrx-field={{me.modelrx}} modelry-field={{me.modelry}} modelrz-field={{me.modelrz}} modelscale-field={{me.modelscale}} modelbounds-field="me.modelbounds"  usestructurebounds-field="me.usestructurebounds"  endpointtext-field={{me.endpointtext}}    width-field={{me.width}} height-field={{me.height}} topoffset-field={{me.topoffset}} leftoffset-field={{me.leftoffset}}  delegate-field="delegate"></div>' ; 
        return tmpl;
      }
    };
  }

  // registers the widget in Studio so that it gets displayed in the Widget Palette, it will only show up in the
  // Widget Palette for views that this widget is registered for (as determined by category property)
  twxAppBuilder.widget('wdg-wayfinderpointscoe', wdgwayfinderpointscoe);

}());
