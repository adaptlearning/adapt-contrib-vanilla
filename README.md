# adapt-contrib-boxMenu  

**Box Menu** is a *menu* bundled with the [Adapt framework](https://github.com/adaptlearning/adapt_framework).  

<img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/boxMenu01.jpg" alt="image of two rectangular menu options produced by box menu">

Menu choices are framed within a box element and arranged in a grid. **Box Menu** allows you to direct the learner to either further menus (sub menus) or to one or more pages of content. The **Box Menu** default is show a title, an image, some body text, duration, a progress indicator and a link button.

[Visit the **Box Menu** wiki](https://github.com/adaptlearning/adapt-contrib-boxmenu/wiki) for more information about its functionality and for explanations of key properties. Options include an estimated time for completion (duration) and a progress bar to indicate the percentage of components that have been completed.

##Installation

As Adapt's *[core menu](https://github.com/adaptlearning/adapt_framework/wiki/Core-Plug-ins-in-the-Adapt-Learning-Framework#menu),* **Box Menu** is included with the [installation of the Adapt framework](https://github.com/adaptlearning/adapt_framework/wiki/Manual-installation-of-the-Adapt-framework#installation) and the [installation of the Adapt authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-Adapt-Origin).

* If **Box Menu** has been uninstalled from the Adapt framework, it may be reinstalled.
With the [Adapt CLI](https://github.com/cajones/adapt-cli) installed, run the following from the command line:  
`adapt install adapt-contrib-boxMenu`

    Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:  
    `"adapt-contrib-boxMenu": "*"`  
    Then running the command:  
    `adapt install`  
    (This second method will reinstall all plug-ins listed in *adapt.json*.)  

* If **Box Menu** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).

##Uninstallation  
The Adapt framework does not allow the installation of more than one menu at a time. In order to replace **Box Menu** it must be uninstalled. With the root of your framework installation as your current working directory, run the following command:  
`adapt uninstall adapt-contrib-boxMenu`  

<div float align=right><a href="#top">Back to Top</a></div>  

## Settings Overview

The attributes listed below are used in *contentObjects.json* to configure **BoxMenu**, and are properly formatted as JSON in [*example.json*](https://github.com/adaptlearning/adapt-contrib-boxMenu/blob/master/example.json). Visit the [**BoxMenu** wiki](https://github.com/adaptlearning/adapt-contrib-boxmenu/wiki) for more information about how they appear in the [authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki). 

### Attributes

**_id** (string): This is a unique identifier that establishes relationships with other content structures. It is referenced in *articles.json* as the `_parentid` of an article model.   

**_parentId** (string): This value is sourced from the parent element's `_id` found within *course.json*. It must match. 

**_type** (string): This value determines what the learner will access by clicking the provided link/button. Acceptable values are `"page"` and `"menu"`. `"page"` will direct the learner to a page structured with articles, blocks, and components. `"menu"` will direct the learner to a page with more menus. 

**_classes** (string): CSS class name to be applied to menu item's `page` element (*src/core/js/views/pageView.js*). The class must be predefined in one of the Less files. Separate multiple classes with a space.

**title** (string): This text is a reference title for the content object.

**displayTitle** (string):  This text is displayed on the menu item.

**body** (string):  Optional text that appears on the menu item. Often used to inform the learner about the menu choice. If no **pageBody** is supplied, this text will also appear as the body text of the page header.

**pageBody** (string): Optional text that appears as the body text of the page header. If this text is not provided, the **body** text will be used (if it is supplied). Reference [*adapt-contrib-vanilla/templates/page.hbs*](https://github.com/adaptlearning/adapt-contrib-vanilla/blob/master/templates/page.hbs).

**_graphic** (object): The image that appears on the menu item. It contains values for **alt** and **src**.

>**alt** (string): This text becomes the image’s `alt` attribute.

>**src** (string): File name (including path) of the image. Path should be relative to the *src* folder (e.g., *"course/en/images/t05.jpg"*).  
       
**linkText** (string): This text is displayed on the menu item's link/button.  

**durationLabel** (string): Optional text which precedes **duration** (e.g., `"Duration:"`).  

**duration** (string): Optional text which follows **durationLabel** (e.g., `"2 mins"`).  
       
<div float align=right><a href="#top">Back to Top</a></div>  

### Accessibility
Several menu-related elements are assigned an [Aria label](https://github.com/adaptlearning/adapt_framework/wiki/Aria-Labels) in *course.json*: menu, menuItem, menuViewButton, and menuLoaded. They are customizable. Aria labels are not visible elements. They are utilized by assistive technology such as screen readers.  

<div float align=right><a href="#top">Back to Top</a></div>

## Limitations
 
No known limitations.  

----------------------------
**Version number:**  2.0   <a href="https://community.adaptlearning.org/ target="_blank"><img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/adapt-logo-mrgn-lft.jpg" alt="adapt learning logo" align="right"></a> 
**Framework versions:**  2.0     
**Author / maintainer:** Adapt Core Team  
**Accessibility support:** WAI AA   
**RTL support:** yes  
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), IE 11, IE10, IE9, IE8, IE Mobile 11, iPhone (iOS 7+8), Safari iPad (iOS 7+8), Safari 8, Opera    
