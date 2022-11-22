# adapt-contrib-vanilla

**Vanilla** is a _theme_ bundled with the [Adapt framework](https://github.com/adaptlearning/adapt_framework).

<img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/vanilla01.jpg" alt="sample colors from the vanilla theme">

It provides specific values to styles, including colors, padding, margins, and assets such as fonts and background images. [Visit the **Vanilla** wiki](https://github.com/adaptlearning/adapt-contrib-vanilla/wiki) for more information about its functionality and for explanations of key properties.

## Installation

As Adapt's _[core theme](https://github.com/adaptlearning/adapt_framework/wiki/Core-Plug-ins-in-the-Adapt-Learning-Framework#theme),_ **Vanilla** is included with the [installation of the Adapt framework](https://github.com/adaptlearning/adapt_framework/wiki/Manual-installation-of-the-Adapt-framework#installation) and the [installation of the Adapt authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-Adapt-Origin).

- If **Vanilla** has been uninstalled from the Adapt framework, it may be reinstalled.
  With the [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run the following from the command line:
  `adapt install adapt-contrib-vanilla`

      Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:
      `"adapt-contrib-vanilla": "*"`
      Then running the command:
      `adapt install`
      (This second method will reinstall all plug-ins listed in *adapt.json*.)

- If **Vanilla** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).

## Uninstallation

The Adapt framework does not allow the installation of more than one theme at a time. In order to replace **Vanilla** it must be uninstalled. With the root of your framework installation as your current working directory, run the following command:
`adapt uninstall adapt-contrib-vanilla`

## Settings overview

Unlike most Adapt plug-ins, the **Vanilla** theme has no attributes that are required to be configured in the course JSON files. There is, however, additional functionality available to apply background images and supporting styles for pages, articles and blocks as desired. These attributes are properly formatted as JSON in [_example.json_](https://github.com/adaptlearning/adapt-contrib-vanilla/blob/master/example.json) and available as configurable attributes in the Adapt authoring tool.

Alongside these settings, there's a collection of [custom classes](https://github.com/adaptlearning/adapt-contrib-vanilla/wiki/Custom-Classes) that the Vanilla theme supports as standard. These classes are mostly designed to provide additional visual options to increase flexibility.

The **Vanilla** theme also exposes [*colour variables*](https://github.com/adaptlearning/adapt-contrib-vanilla/blob/master/less/_defaults/_colors.less) in the Adapt Authoring Tool for theme-by-config editing. This feature allows you to apply and save color presets.

## JSON Config and Authoring Tool Options

An explanation on what properties are available as part of the theme can be found [here](https://github.com/adaptlearning/adapt-contrib-vanilla/wiki/JSON-Config-and-Authoring-Tool-Options)

## onScreen Animation

Further information regarding the onScreen properties can be found on the [wiki](https://github.com/adaptlearning/adapt-contrib-vanilla/wiki/onScreen-Animation)

## Custom Classes

All supported custom classes defined in the Vanilla theme are detailed [here](https://github.com/adaptlearning/adapt-contrib-vanilla/wiki/Custom-Classes)

## Structure

To view a breakdown of the themes structure please visit the [wiki](https://github.com/adaptlearning/adapt-contrib-vanilla/wiki/Structure)

## Icons

The [wiki](https://github.com/adaptlearning/adapt-contrib-vanilla/wiki/Icons) features a detailed overview of the icons available within the themes custom font set

## Limitations

No known limitations.

---

**Version number:** 6.2.1 <a href="https://community.adaptlearning.org/" target="_blank"><img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/adapt-logo-mrgn-lft.jpg" alt="adapt learning logo" align="right"></a><br>
**Framework versions:** 5.22.9+<br>
**Author / maintainer:** Adapt Core Team with [contributors](https://github.com/adaptlearning/adapt-contrib-vanilla/graphs/contributors)<br>
**Accessibility support:** WAI AA<br>
**RTL support:** Yes<br>
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge, IE11, Safari 14 for macOS/iOS/iPadOS, Opera<br>
