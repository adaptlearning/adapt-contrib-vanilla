# adapt-contrib-apolitical-theme

Apolitical's default course style.

## Installation

TODO:
How to get this into the authoriting tool

TODO:
How to load this into a course

## Uninstallation

TODO:
How to replace this with another theme, or updated theme

## Dev Setup

TODO:
Docs when I work this out

## Settings overview

Unlike most Adapt plug-ins, the **Vanilla** theme has no attributes that are required to be configured in the course JSON files. There is, however, an option to alter the background color of blocks as desired. Configure the attributes highlighted below in *blocks.json*. These attributes are properly formatted as JSON in [*example.json*](https://github.com/adaptlearning/adapt-contrib-vanilla/blob/master/example.json).

#### **blocks.json**
**_theme** (object): The theme attributes group contains attributes that override those set in **Vanilla**. These include **_backgroundColor**, **_minimumHeights**, and **_isDividerBlock**.

>**_backgroundColor** (string): This value is the name of a color variable that has been defined in  *less/colors.less*. Omit the initial `@` that is a part of the variable declaration. For example, an acceptable value is `"background-color-inverted"`.  

>**_minimumHeights** (object): The minimum heights attribute group specifies the minimum height of the block at different device widths (`_large`, `_medium`, and `_small`).   

>>**_large** (number): This value specifies the CSS minimum height when `Adapt.device.screenSize'` evaluates to `"_large"`.  

>>**_medium** (number): This value specifies the CSS minimum height when `Adapt.device.screenSize'` evaluates to `"_medium"`.   

>>**_small** (number): This value specifies the CSS minimum height when `Adapt.device.screenSize'` evaluates to `"_small"`.   

>**_isDividerBlock** (boolean): - Determines whether the CSS class `divider-block` *(less/src/theme-extras.less)* will be applied. Acceptable values are `true` and `false`.

Visit the [**Vanilla** wiki](https://github.com/adaptlearning/adapt-contrib-vanilla/wiki) for more information about how to use and manipulate the theme.  

## Structure  

| Folder/File         | Description  |
| :-------------      |:-------------|
| 📄 theme.json        | Pixel values for `screenSize`(`small`, `medium`, and `large`)|
| 📄 selection.json    | File used for selecting icons at [IcoMoon.io](https://icomoon.io/) that are packaged in fonts/vanilla.* |
| 📁 assets            | Location of theme assets (for example: images, loading gif, etc.)|
| 📁 fonts             | Location of any theme font files |
| 📁 js                | JavaScript files on which the theme depends      |
| 📁 less              | Location of any [LESS](http://lesscss.org/) based CSS files |
| 📄 less/generic.less | Variables that are not covered by those defined in colors.less, fonts.less, and paddings.less   |
| 📁 less/src          | Location of LESS files for various Adapt elements |
| 📄 less/src/theme-extras.less| Classes used for bespoke styling |
| 📁 templates         | Location of overridden HTML (.hbs) templates |
| 📁 templates/partials| Location of overridden HTML (.hbs) templates required by other templates, specifically buttons.hbs, component.hbs, and state.hbs |  

## Templates

**Vanilla** supports customisation for the rendering of various Adapt elements through the use of [Handlebars](http://handlebarsjs.com/) templates.  The file name of the template indicates the element it affects. Among the available templates are:
* article.hbs
* block.hbs
* loading.hbs
* navigation.hbs
* page.hbs

## Limitations

No known limitations.  
