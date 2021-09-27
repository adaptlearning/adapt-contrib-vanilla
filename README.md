# adapt-contrib-vanilla

**Vanilla** is a *theme* bundled with the [Adapt framework](https://github.com/adaptlearning/adapt_framework).

<img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/vanilla01.jpg" alt="sample colors from the vanilla theme">

It provides specific values to styles, including colors, padding, margins, and assets such as fonts and background images. [Visit the **Vanilla** wiki](https://github.com/adaptlearning/adapt-contrib-vanilla/wiki) for more information about its functionality and for explanations of key properties.

## Installation

As Adapt's *[core theme](https://github.com/adaptlearning/adapt_framework/wiki/Core-Plug-ins-in-the-Adapt-Learning-Framework#theme),* **Vanilla** is included with the [installation of the Adapt framework](https://github.com/adaptlearning/adapt_framework/wiki/Manual-installation-of-the-Adapt-framework#installation) and the [installation of the Adapt authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-Adapt-Origin).

* If **Vanilla** has been uninstalled from the Adapt framework, it may be reinstalled.
With the [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run the following from the command line:
`adapt install adapt-contrib-vanilla`

    Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:
    `"adapt-contrib-vanilla": "*"`
    Then running the command:
    `adapt install`
    (This second method will reinstall all plug-ins listed in *adapt.json*.)

* If **Vanilla** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).

## Uninstallation

The Adapt framework does not allow the installation of more than one theme at a time. In order to replace **Vanilla** it must be uninstalled. With the root of your framework installation as your current working directory, run the following command:
`adapt uninstall adapt-contrib-vanilla`

## Settings overview

Unlike most Adapt plug-ins, the **Vanilla** theme has no attributes that are required to be configured in the course JSON files. There is, however, additional functionality available to apply background images and supporting styles for pages, articles and blocks as desired. These attributes are properly formatted as JSON in [*example.json*](https://github.com/adaptlearning/adapt-contrib-vanilla/blob/master/example.json) and available as configurable attributes in the Adapt authoring tool.

Alongside this, the [*example.json*](https://github.com/adaptlearning/adapt-contrib-vanilla/blob/master/example.json#L86) contains a collection of custom classes that Adapt and the Vanilla theme support as standard. These classes are mostly designed to provide additional visual options to increase flexibility.

The **Vanilla** theme also exposes [*colour variables*](https://github.com/adaptlearning/adapt-contrib-vanilla/blob/master/less/_defaults/colors.less) in the Adapt authoring tool for theme editing. This feature allows you to apply and save 'preset' theme styles.

**\_vanilla** (object): The following attributes configure the defaults for **Vanilla**. These include **\_backgroundImage**, **\_backgroundStyles** and **\_minimumHeights**. Global attributes are available at page, article and block level.

#### Global background image
>**\_backgroundImage** (object): The backgroundImage object that contains values for **\_large**, **\_medium** and **\_small**.

>>**\_large** (string): File name (including path) of the image used with large device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-one.jpg*).

>>**\_medium** (string): File name (including path) of the image used with medium device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-one.jpg*).

>>**\_small** (string): File name (including path) of the image used with small device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-one.jpg*).

#### Global background image styles
>**_backgroundStyles** (object): Additional attributes available to customise how background images display. The backgroundStyles object contains values for **\_backgroundRepeat**, **\_backgroundSize** and **\_backgroundPosition**.

>>**\_backgroundRepeat** (string): This attribute defines how the background image repeats. Properties include **repeat**, **repeat-x**, **repeat-y** and **no-repeat**.
Repeat-x: The background image is repeated only horizontally. Repeat-y: The background image is repeated only vertically.

>>**\_backgroundSize** (string): This attribute defines the size the background image display. Properties include **auto**, **cover**, **contain**, and **100% 100%**.
Auto: The background image is displayed in its original size. Cover: Resize the background image to cover the entire container, even if it has to stretch or crop the image. Contain: Resize the background image to make sure the image is fully visible. 100% 100%: Resize the background image to match the dimensions of the container.

#### Global minimum heights
>**_minimumHeights** (object): The minimum heights attribute group specifies the minimum height of the image container at different device widths (`_large`, `_medium`, and `_small`).

>>**\_large** (number): The minimum height should only be used in instances where the image container height needs to be greater than the content e.g. to prevent a background image being cropped.

>>**\_medium** (number): The minimum height should only be used in instances where the image container height needs to be greater than the content e.g. to prevent a background image being cropped.

>>**\_small** (number): The minimum height should only be used in instances where the image container height needs to be greater than the content e.g. to prevent a background image being cropped.

#### Global responsive classes
>**\_responsiveClasses** (object): The responsive classes object adds the associated CSS class(es) to the container element at different device widths (`_large`, `_medium`, `_small`). The class(es) are removed between each device width. Useful for applying styles for a particular device width only rather than applying a global `_classes` style.

>>**\_large** (string): Custom CSS class that is applied at the large device width.

>>**\_medium** (string): Custom CSS class that is applied at the medium device width.

>>**\_small** (string): Custom CSS class that is applied at the small device width.

#### **contentObject.json**
>**\_pageHeader** (object): The backgroundImage object that contains values for **\_large**, **\_medium** and **\_small**.

>>**\_large** (string): File name (including path) of the image used with large device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-one.jpg*).

>>**\_medium** (string): File name (including path) of the image used with medium device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-one.jpg*).

>>**\_small** (string): File name (including path) of the image used with small device width. Path should be relative to the *src* folder (e.g., *course/en/images/origami-menu-one.jpg*).

#### **blocks.json**
>**\_isDividerBlock** (boolean): - Determines whether the CSS class `is-divider-block` will be applied. Acceptable values are `true` and `false`.

Visit the [**Vanilla** wiki](https://github.com/adaptlearning/adapt-contrib-vanilla/wiki) for more information about how to use and manipulate the theme.

## Structure

| Folder/File         | Description  |
| :-------------      |:-------------|
| 📁 assets                     | Optional global assets can be added here |
| 📁 fonts                      | Optional global fonts can be added here |
| 📁 js                         | JavaScript files on which the theme depends |
| 📁 less                       | Location of any [LESS](http://lesscss.org/) based CSS files |
| 📁 less/_defaults             | Location of configuration LESS files |
| 📄 less/_defaults/colors.less | Location of global colour variables |
| 📁 less/core                  | Location of Adapt Framework LESS file styles |
| 📁 less/plugins               | Location of Adapt plugin LESS file styles |
| 📁 less/project               | Location of additional LESS file styles |
| 📁 templates                  | Optional global template overrides can be added here |

## Templates

**Vanilla** supports customisation for the rendering of various Adapt elements through the use of [Handlebars](http://handlebarsjs.com/) templates. The file name of the template indicates the element it affects.

## Limitations

No known limitations.

----------------------------
**Version number:**  5.7.2  <a href="https://community.adaptlearning.org/" target="_blank"><img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/adapt-logo-mrgn-lft.jpg" alt="adapt learning logo" align="right"></a><br>
**Framework versions:**  5.3+<br>
**Author / maintainer:** Adapt Core Team with [contributors](https://github.com/adaptlearning/adapt-contrib-vanilla/graphs/contributors)<br>
**Accessibility support:** WAI AA<br>
**RTL support:** Yes<br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 14 for macOS/iOS/iPadOS, Opera<br>
