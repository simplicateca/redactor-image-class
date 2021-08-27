# redactor-image-class

This redactor plugin modifies the image edit modal to include a configurable drop down of class names that you can use to style images differently.

![redactor image class plugin screenshot](https://simplicate.nyc3.digitaloceanspaces.com/simplicate/assets/site/images/redactor-image-class.png)

This is an early draft of the plugin and any bug reports would be appreciated.

## Installation

If you're using Craft CMS, copy the file `src/imageclass.js` from this repository into your `cms/config/redactor/plugins` directory.


## Configuration

You can configure the available class names within your redactor JSON config file:

*Sample Redactor-Config.json*

```
  ...
  "plugins": ["imageclass"],
  "imageClasses" : [
    { "label": "Large",   "class": "image image--large" },
    { "label": "Normal",  "class": "image", "default": true },
    { "label": "Small",   "class": "image image--small" }
  ]
  ...
```

### Setting a default value

As you can see from the sample configuration above, you can set the `default` attribute to `true` for one of your classes and the plugin will use that value as the default class for all new images.

Setting a default value will also force the user to pick at least one class from the list.

If you choose not a set a default value, and empty option will be available in the drop-down and selected by default.

## Styling images inside Redactor

If you want your images with class names to appear differently within the redactor editor, you'll need to inject some css into your admin panel.

*Sample control-panel.css*

```
    .input .redactor-styles figure.image {
        max-width: 50%;
        margin: 0 auto;
    }

    .input .redactor-styles figure.image.image--large {
        max-width: 100%;
    }

    .input .redactor-styles figure.image.image--small {
        max-width: 25%;
    }

```

If you're using Craft CMS you could either use a plugin to inject this code into your admin panel, or you can create a module and load your own CSS file.

Here are some resources that might be of assistance:

 - https://plugins.craftcms.com/cp-css
 - https://craftquest.io/livestreams/building-a-craft-module
 - https://craftcms.com/docs/3.x/extend/module-guide.html
 - https://pluginfactory.io/

If you're using Redactor in some other tool, you'll have to do your own digging to figure out how to add CSS in your editor.