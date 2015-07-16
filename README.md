#adapt-contrib-vanilla

This is the 'Vanilla' theme, a core theme bundled with the Adapt framework.

##Installation

First, be sure to install the [Adapt Command Line Interface](https://github.com/adaptlearning/adapt-cli), then from the command line run:-

        adapt install adapt-contrib-vanilla

This theme can also be installed by adding the theme to the adapt.json file before running `adapt install`:
 
        "adapt-contrib-vanilla": "*"

##Usage

As with any Adapt compatible theme, the structure of the theme is as follows:

| Folder        | Purpose|
| ------------- |:-------------|
| assets        | _Holds any static assets (for example: images, etc.)_|
| fonts         | _Any fonts which might be referenced in the associated .less files_      |   
| js            | _JavaScript/JQuery files on which the theme depends go here_      |
| less          | _Location for any [LESS](http://lesscss.org/) based CSS files_ |
| templates     | _Location for any snippets of pre-defined HTML templates (see below)_ |


##Templates

Adapt themes support customisation for the rendering of various Adapt elements via the following [Handlebars](http://handlebarsjs.com/) templates.  Note that the filenames match the templates to which they refer:
* article.hbs
* block.hbs
* loading.hbs 
* navigation.hbs
* page.hbs


##Limitations
 
To be completed.

##Browser spec

This component has been tested to the standard Adapt browser specification.