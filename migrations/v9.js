import { describe, whereFromPlugin, whereContent, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

const COMPONENT_HORIZONTAL_ALIGNMENT_VALUES = ['left', 'center', 'right'];
const TEXT_ALIGNMENT_VALUES = ['', 'left', 'center', 'right'];
const BACKGROUND_REPEAT_VALUES_NARROW = ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'];
const BACKGROUND_SIZE_VALUES_NARROW = ['auto', 'cover', 'contain', '100% 100%'];
const BACKGROUND_POSITION_VALUES_NARROW = ['left top', 'left center', 'left bottom', 'center top', 'center center', 'center bottom', 'right top', 'right center', 'right bottom'];

describe('adapt-contrib-vanilla - v8.1.0 > v9.5.0', async () => {
  let blocks;

  whereFromPlugin('adapt-contrib-vanilla - from v8.1.0', { name: 'adapt-contrib-vanilla', version: '<9.5.0' });

  whereContent('adapt-contrib-vanilla - where block', async (content) => {
    blocks = content.filter(item => item._type === 'block');
    return blocks.length;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._componentHorizontalAlignment to block', async (content) => {
    blocks.forEach(block => {
      if (_.has(block, '_vanilla._componentHorizontalAlignment')) return;
      _.set(block, '_vanilla._componentHorizontalAlignment', 'left');
    });
    return true;
  });

  checkContent('adapt-contrib-vanilla - check block._vanilla._componentHorizontalAlignment', async (content) => {
    const isValid = blocks.every(block => COMPONENT_HORIZONTAL_ALIGNMENT_VALUES.includes(_.get(block, '_vanilla._componentHorizontalAlignment')));
    if (!isValid) throw new Error('adapt-contrib-vanilla - block._vanilla._componentHorizontalAlignment not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v9.5.0', { name: 'adapt-contrib-vanilla', version: '9.5.0', framework: '>=5.24.2' });

  testSuccessWhere('correct version with block content', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '8.1.0' }],
    content: [{ _id: 'b-100', _type: 'block' }]
  });

  testSuccessWhere('correct version with _vanilla already partially configured', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '8.1.0' }],
    content: [{ _id: 'b-100', _type: 'block', _vanilla: { _componentVerticalAlignment: 'center' } }]
  });

  testStopWhere('no block content', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '8.1.0' }],
    content: [{ _type: 'course' }, { _id: 'a-100', _type: 'article' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.5.0' }]
  });
});

describe('adapt-contrib-vanilla - v9.5.0 > v9.6.0', async () => {
  let course;

  whereFromPlugin('adapt-contrib-vanilla - from v9.5.0', { name: 'adapt-contrib-vanilla', version: '<9.6.0' });

  whereContent('adapt-contrib-vanilla - where course', async (content) => {
    course = getCourse();
    return course;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._favIcon._src to course', async (content) => {
    if (_.has(course, '_vanilla._favIcon._src')) return true;
    _.set(course, '_vanilla._favIcon._src', '');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check course._vanilla._favIcon._src', async (content) => {
    const isValid = typeof _.get(course, '_vanilla._favIcon._src') === 'string';
    if (!isValid) throw new Error('adapt-contrib-vanilla - course._vanilla._favIcon._src not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v9.6.0', { name: 'adapt-contrib-vanilla', version: '9.6.0', framework: '>=5.24.2' });

  testSuccessWhere('correct version with course content', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.5.0' }],
    content: [{ _type: 'course' }]
  });

  testSuccessWhere('correct version with _vanilla already partially configured', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.5.0' }],
    content: [{ _type: 'course', _vanilla: { _favIcon: { _src: 'course/en/assets/favicon.ico' } } }]
  });

  testStopWhere('no course content', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.5.0' }],
    content: [{ _id: 'b-100', _type: 'block' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.6.0' }]
  });
});

describe('adapt-contrib-vanilla - v9.6.0 > v9.6.13', async () => {
  let course;
  const menuHeaderColorKeys = ['menu-header-background-color', 'menu-header-title-color', 'menu-header-body-color', 'menu-header-instruction-color'];

  whereFromPlugin('adapt-contrib-vanilla - from v9.6.0', { name: 'adapt-contrib-vanilla', version: '<9.6.13' });

  whereContent('adapt-contrib-vanilla - where themeVariables', async (content) => {
    course = getCourse();
    return course?.themeVariables;
  });

  mutateContent('adapt-contrib-vanilla - add menu-header colour theme variables to course', async (content) => {
    menuHeaderColorKeys.forEach(key => {
      if (_.has(course.themeVariables, key)) return;
      course.themeVariables[key] = '';
    });
    return true;
  });

  checkContent('adapt-contrib-vanilla - check menu-header colour theme variables', async (content) => {
    const isValid = menuHeaderColorKeys.every(key => typeof course.themeVariables[key] === 'string');
    if (!isValid) throw new Error('adapt-contrib-vanilla - menu-header colour theme variables not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v9.6.13', { name: 'adapt-contrib-vanilla', version: '9.6.13', framework: '>=5.31.3' });

  testSuccessWhere('correct version with themeVariables', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.6.0' }],
    content: [{ _type: 'course', themeVariables: {} }]
  });

  testSuccessWhere('correct version with existing menu-header-background-color', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.6.0' }],
    content: [{ _type: 'course', themeVariables: { 'menu-header-background-color': '#123456' } }]
  });

  testStopWhere('no themeVariables', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.6.0' }],
    content: [{ _type: 'course' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.6.13' }]
  });
});

describe('adapt-contrib-vanilla - v9.6.13 > v9.6.15', async () => {
  let articles, blocks, contentObjects;

  whereFromPlugin('adapt-contrib-vanilla - from v9.6.13', { name: 'adapt-contrib-vanilla', version: '<9.6.15' });

  whereContent('adapt-contrib-vanilla - where article, block or contentObject', async (content) => {
    articles = content.filter(item => item._type === 'article');
    blocks = content.filter(item => item._type === 'block');
    contentObjects = content.filter(item => ['page', 'menu'].includes(item._type));
    return articles.length || blocks.length || contentObjects.length;
  });

  // _backgroundImage._xlarge is deliberately left unset, here and on _pageHeader below.
  // themeView.js reads `_backgroundImage[`_${device.screenSize}`] ?? _backgroundImage._small`
  // and `??` only falls through on nullish, so writing '' would suppress that fallback and
  // blank the background at >=1280px for any course relying on it. The schema gives _xlarge
  // no default for the same reason, so leaving it absent matches a freshly authored course.
  // _responsiveClasses._xlarge and _minimumHeights._xlarge do carry schema defaults ('' and
  // 0), so those are set below.

  mutateContent('adapt-contrib-vanilla - add _vanilla._responsiveClasses._xlarge to article, block and contentObject', async (content) => {
    [...articles, ...blocks, ...contentObjects].forEach(item => {
      if (!_.has(item, '_vanilla._responsiveClasses') || _.has(item, '_vanilla._responsiveClasses._xlarge')) return;
      item._vanilla._responsiveClasses._xlarge = '';
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._minimumHeights._xlarge to block', async (content) => {
    blocks.forEach(block => {
      if (!_.has(block, '_vanilla._minimumHeights') || _.has(block, '_vanilla._minimumHeights._xlarge')) return;
      block._vanilla._minimumHeights._xlarge = 0;
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._pageHeader._minimumHeights._xlarge to contentObject', async (content) => {
    contentObjects.forEach(contentObject => {
      if (!_.has(contentObject, '_vanilla._pageHeader._minimumHeights') || _.has(contentObject, '_vanilla._pageHeader._minimumHeights._xlarge')) return;
      contentObject._vanilla._pageHeader._minimumHeights._xlarge = 0;
    });
    return true;
  });

  checkContent('adapt-contrib-vanilla - check _vanilla._backgroundImage._xlarge is left unset', async (content) => {
    const isValid = [...articles, ...blocks, ...contentObjects].every(item => !_.has(item, '_vanilla._backgroundImage') || !_.has(item, '_vanilla._backgroundImage._xlarge'));
    if (!isValid) throw new Error('adapt-contrib-vanilla - _vanilla._backgroundImage._xlarge should be left unset so the _small fallback applies');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check _vanilla._responsiveClasses._xlarge', async (content) => {
    const isValid = [...articles, ...blocks, ...contentObjects].every(item => !_.has(item, '_vanilla._responsiveClasses') || typeof item._vanilla._responsiveClasses._xlarge === 'string');
    if (!isValid) throw new Error('adapt-contrib-vanilla - _vanilla._responsiveClasses._xlarge not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check block._vanilla._minimumHeights._xlarge', async (content) => {
    const isValid = blocks.every(block => !_.has(block, '_vanilla._minimumHeights') || typeof block._vanilla._minimumHeights._xlarge === 'number');
    if (!isValid) throw new Error('adapt-contrib-vanilla - block._vanilla._minimumHeights._xlarge not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check contentObject._vanilla._pageHeader._backgroundImage._xlarge is left unset', async (content) => {
    const isValid = contentObjects.every(contentObject => !_.has(contentObject, '_vanilla._pageHeader._backgroundImage') || !_.has(contentObject, '_vanilla._pageHeader._backgroundImage._xlarge'));
    if (!isValid) throw new Error('adapt-contrib-vanilla - contentObject._vanilla._pageHeader._backgroundImage._xlarge should be left unset so the _small fallback applies');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check contentObject._vanilla._pageHeader._minimumHeights._xlarge', async (content) => {
    const isValid = contentObjects.every(contentObject => !_.has(contentObject, '_vanilla._pageHeader._minimumHeights') || typeof contentObject._vanilla._pageHeader._minimumHeights._xlarge === 'number');
    if (!isValid) throw new Error('adapt-contrib-vanilla - contentObject._vanilla._pageHeader._minimumHeights._xlarge not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v9.6.15', { name: 'adapt-contrib-vanilla', version: '9.6.15', framework: '>=5.31.3' });

  testSuccessWhere('correct version with fully configured _vanilla content', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.6.13' }],
    content: [
      { _id: 'a-100', _type: 'article', _vanilla: { _backgroundImage: { _large: '', _medium: '', _small: '' }, _responsiveClasses: { _large: '', _medium: '', _small: '' } } },
      { _id: 'b-100', _type: 'block', _vanilla: { _backgroundImage: { _large: '', _medium: '', _small: '' }, _minimumHeights: { _large: 0, _medium: 0, _small: 0 }, _responsiveClasses: { _large: '', _medium: '', _small: '' } } },
      { _id: 'co-100', _type: 'page', _vanilla: { _backgroundImage: { _large: '', _medium: '', _small: '' }, _responsiveClasses: { _large: '', _medium: '', _small: '' }, _pageHeader: { _backgroundImage: { _large: '', _medium: '', _small: '' }, _minimumHeights: { _large: 0, _medium: 0, _small: 0 } } } }
    ]
  });

  testSuccessWhere('correct version with minimal _vanilla content', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.6.13' }],
    content: [{ _id: 'a-100', _type: 'article', _vanilla: {} }]
  });

  testStopWhere('no article, block or contentObject', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.6.13' }],
    content: [{ _type: 'course' }, { _type: 'config' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.6.15' }]
  });
});

describe('adapt-contrib-vanilla - v9.6.15 > v9.8.2', async () => {
  let articles, blocks, contentObjects;

  whereFromPlugin('adapt-contrib-vanilla - from v9.6.15', { name: 'adapt-contrib-vanilla', version: '<9.8.2' });

  whereContent('adapt-contrib-vanilla - where article, block or contentObject', async (content) => {
    articles = content.filter(item => item._type === 'article');
    blocks = content.filter(item => item._type === 'block');
    contentObjects = content.filter(item => ['page', 'menu'].includes(item._type));
    return articles.length || blocks.length || contentObjects.length;
  });

  mutateContent('adapt-contrib-vanilla - convert empty _vanilla._backgroundStyles values to new defaults', async (content) => {
    [...articles, ...blocks, ...contentObjects].forEach(item => {
      const styles = _.get(item, '_vanilla._backgroundStyles');
      if (!styles) return;
      if (styles._backgroundRepeat === '') styles._backgroundRepeat = 'no-repeat';
      if (styles._backgroundSize === '') styles._backgroundSize = 'cover';
      if (styles._backgroundPosition === '') styles._backgroundPosition = 'center top';
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - convert empty _vanilla._pageHeader._backgroundStyles values to new defaults', async (content) => {
    contentObjects.forEach(contentObject => {
      const styles = _.get(contentObject, '_vanilla._pageHeader._backgroundStyles');
      if (!styles) return;
      if (styles._backgroundRepeat === '') styles._backgroundRepeat = 'no-repeat';
      if (styles._backgroundSize === '') styles._backgroundSize = 'cover';
      if (styles._backgroundPosition === '') styles._backgroundPosition = 'center top';
    });
    return true;
  });

  checkContent('adapt-contrib-vanilla - check _vanilla._backgroundStyles values are within the narrowed enum', async (content) => {
    const isValid = [...articles, ...blocks, ...contentObjects].every(item => {
      const styles = _.get(item, '_vanilla._backgroundStyles');
      if (!styles) return true;
      return BACKGROUND_REPEAT_VALUES_NARROW.includes(styles._backgroundRepeat) &&
        BACKGROUND_SIZE_VALUES_NARROW.includes(styles._backgroundSize) &&
        BACKGROUND_POSITION_VALUES_NARROW.includes(styles._backgroundPosition);
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - _vanilla._backgroundStyles not converted to narrowed enum values');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check _vanilla._pageHeader._backgroundStyles values are within the narrowed enum', async (content) => {
    const isValid = contentObjects.every(contentObject => {
      const styles = _.get(contentObject, '_vanilla._pageHeader._backgroundStyles');
      if (!styles) return true;
      return BACKGROUND_REPEAT_VALUES_NARROW.includes(styles._backgroundRepeat) &&
        BACKGROUND_SIZE_VALUES_NARROW.includes(styles._backgroundSize) &&
        BACKGROUND_POSITION_VALUES_NARROW.includes(styles._backgroundPosition);
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - _vanilla._pageHeader._backgroundStyles not converted to narrowed enum values');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v9.8.2', { name: 'adapt-contrib-vanilla', version: '9.8.2', framework: '>=5.31.3' });

  testSuccessWhere('correct version with empty-string backgroundStyles to convert', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.6.15' }],
    content: [
      { _id: 'a-100', _type: 'article', _vanilla: { _backgroundStyles: { _backgroundRepeat: '', _backgroundSize: '', _backgroundPosition: '' } } },
      { _id: 'co-100', _type: 'page', _vanilla: { _pageHeader: { _backgroundStyles: { _backgroundRepeat: '', _backgroundSize: '', _backgroundPosition: '' } } } }
    ]
  });

  testSuccessWhere('correct version with explicit non-empty values left untouched', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.6.15' }],
    content: [{ _id: 'b-100', _type: 'block', _vanilla: { _backgroundStyles: { _backgroundRepeat: 'repeat-x', _backgroundSize: 'contain', _backgroundPosition: 'left top' } } }]
  });

  testStopWhere('no article, block or contentObject', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.6.15' }],
    content: [{ _type: 'course' }, { _type: 'config' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.8.2' }]
  });
});

describe('adapt-contrib-vanilla - v9.8.2 > v9.16.1', async () => {
  let course;
  const miscColorKeys = ['loading', 'loading-inverted'];

  whereFromPlugin('adapt-contrib-vanilla - from v9.8.2', { name: 'adapt-contrib-vanilla', version: '<9.16.1' });

  whereContent('adapt-contrib-vanilla - where themeVariables', async (content) => {
    course = getCourse();
    return course?.themeVariables;
  });

  mutateContent('adapt-contrib-vanilla - add loading colour theme variables to course', async (content) => {
    miscColorKeys.forEach(key => {
      if (_.has(course.themeVariables, key)) return;
      course.themeVariables[key] = '';
    });
    return true;
  });

  checkContent('adapt-contrib-vanilla - check loading colour theme variables', async (content) => {
    const isValid = miscColorKeys.every(key => typeof course.themeVariables[key] === 'string');
    if (!isValid) throw new Error('adapt-contrib-vanilla - loading colour theme variables not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v9.16.1', { name: 'adapt-contrib-vanilla', version: '9.16.1', framework: '>=5.31.3' });

  testSuccessWhere('correct version with themeVariables', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.8.2' }],
    content: [{ _type: 'course', themeVariables: {} }]
  });

  testSuccessWhere('correct version with existing loading colour', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.8.2' }],
    content: [{ _type: 'course', themeVariables: { loading: '#123456' } }]
  });

  testStopWhere('no themeVariables', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.8.2' }],
    content: [{ _type: 'course' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.16.1' }]
  });
});

describe('adapt-contrib-vanilla - v9.16.1 > v9.17.2', async () => {
  let course;

  whereFromPlugin('adapt-contrib-vanilla - from v9.16.1', { name: 'adapt-contrib-vanilla', version: '<9.17.2' });

  whereContent('adapt-contrib-vanilla - where themeVariables', async (content) => {
    course = getCourse();
    return course?.themeVariables;
  });

  mutateContent('adapt-contrib-vanilla - add menu-header-subtitle-color theme variable to course', async (content) => {
    if (_.has(course.themeVariables, 'menu-header-subtitle-color')) return true;
    course.themeVariables['menu-header-subtitle-color'] = '';
    return true;
  });

  checkContent('adapt-contrib-vanilla - check menu-header-subtitle-color theme variable', async (content) => {
    const isValid = typeof course.themeVariables['menu-header-subtitle-color'] === 'string';
    if (!isValid) throw new Error('adapt-contrib-vanilla - menu-header-subtitle-color theme variable not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v9.17.2', { name: 'adapt-contrib-vanilla', version: '9.17.2', framework: '>=5.31.3' });

  testSuccessWhere('correct version with themeVariables', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.16.1' }],
    content: [{ _type: 'course', themeVariables: {} }]
  });

  testSuccessWhere('correct version with existing menu-header-subtitle-color', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.16.1' }],
    content: [{ _type: 'course', themeVariables: { 'menu-header-subtitle-color': '#123456' } }]
  });

  testStopWhere('no themeVariables', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.16.1' }],
    content: [{ _type: 'course' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.17.2' }]
  });
});

describe('adapt-contrib-vanilla - v9.17.2 > v9.25.0', async () => {
  let course;
  const buttonKeys = ['btn-color-focus', 'btn-color-inverted-focus', 'btn-color-selected', 'btn-color-inverted-selected', 'btn-color-locked', 'btn-color-inverted-locked'];
  const globalUiKeys = ['ui-color', 'ui-color-inverted'];
  const itemsKeys = ['item-color-focus', 'item-color-inverted-focus', 'item-color-disabled', 'item-color-inverted-disabled'];
  const itemsUiKeys = ['item-ui-color', 'item-ui-color-inverted', 'item-ui-color-hover', 'item-ui-color-inverted-hover', 'item-ui-color-focus', 'item-ui-color-inverted-focus', 'item-ui-color-selected', 'item-ui-color-inverted-selected', 'item-ui-color-visited', 'item-ui-color-inverted-visited', 'item-ui-color-locked', 'item-ui-color-inverted-locked', 'item-ui-color-disabled', 'item-ui-color-inverted-disabled'];
  const menuKeys = ['menu-item-btn-color-focus', 'menu-item-btn-color-inverted-focus', 'menu-item-btn-color-locked', 'menu-item-btn-color-inverted-locked'];
  const navKeys = ['nav-icon-focus', 'nav-icon-inverted-focus', 'nav-icon-locked', 'nav-icon-inverted-locked', 'nav-icon-disabled', 'nav-icon-inverted-disabled'];
  const notifyKeys = ['notify-icon-focus', 'notify-icon-inverted-focus', 'notify-icon-disabled', 'notify-icon-inverted-disabled', 'notify-btn-focus', 'notify-btn-inverted-focus', 'notify-btn-selected', 'notify-btn-inverted-selected', 'notify-btn-locked', 'notify-btn-inverted-locked', 'notify-btn-disabled', 'notify-btn-inverted-disabled'];
  const drawerKeys = ['drawer-icon-focus', 'drawer-icon-inverted-focus', 'drawer-item-focus', 'drawer-item-inverted-focus', 'drawer-item-locked', 'drawer-item-inverted-locked'];

  whereFromPlugin('adapt-contrib-vanilla - from v9.17.2', { name: 'adapt-contrib-vanilla', version: '<9.25.0' });

  whereContent('adapt-contrib-vanilla - where themeVariables', async (content) => {
    course = getCourse();
    return course?.themeVariables;
  });

  mutateContent('adapt-contrib-vanilla - add button state theme variables to course', async (content) => {
    buttonKeys.forEach(key => { if (!_.has(course.themeVariables, key)) course.themeVariables[key] = ''; });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add globalUi theme variables to course', async (content) => {
    globalUiKeys.forEach(key => { if (!_.has(course.themeVariables, key)) course.themeVariables[key] = ''; });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add item state theme variables to course', async (content) => {
    itemsKeys.forEach(key => { if (!_.has(course.themeVariables, key)) course.themeVariables[key] = ''; });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add itemsUi theme variables to course', async (content) => {
    itemsUiKeys.forEach(key => { if (!_.has(course.themeVariables, key)) course.themeVariables[key] = ''; });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add menu state theme variables to course', async (content) => {
    menuKeys.forEach(key => { if (!_.has(course.themeVariables, key)) course.themeVariables[key] = ''; });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add nav state theme variables to course', async (content) => {
    navKeys.forEach(key => { if (!_.has(course.themeVariables, key)) course.themeVariables[key] = ''; });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add notify state theme variables to course', async (content) => {
    notifyKeys.forEach(key => { if (!_.has(course.themeVariables, key)) course.themeVariables[key] = ''; });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add drawer state theme variables to course', async (content) => {
    drawerKeys.forEach(key => { if (!_.has(course.themeVariables, key)) course.themeVariables[key] = ''; });
    return true;
  });

  checkContent('adapt-contrib-vanilla - check button state theme variables', async (content) => {
    if (!buttonKeys.every(key => typeof course.themeVariables[key] === 'string')) throw new Error('adapt-contrib-vanilla - button state theme variables not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check globalUi theme variables', async (content) => {
    if (!globalUiKeys.every(key => typeof course.themeVariables[key] === 'string')) throw new Error('adapt-contrib-vanilla - globalUi theme variables not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check item state theme variables', async (content) => {
    if (!itemsKeys.every(key => typeof course.themeVariables[key] === 'string')) throw new Error('adapt-contrib-vanilla - item state theme variables not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check itemsUi theme variables', async (content) => {
    if (!itemsUiKeys.every(key => typeof course.themeVariables[key] === 'string')) throw new Error('adapt-contrib-vanilla - itemsUi theme variables not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check menu state theme variables', async (content) => {
    if (!menuKeys.every(key => typeof course.themeVariables[key] === 'string')) throw new Error('adapt-contrib-vanilla - menu state theme variables not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check nav state theme variables', async (content) => {
    if (!navKeys.every(key => typeof course.themeVariables[key] === 'string')) throw new Error('adapt-contrib-vanilla - nav state theme variables not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check notify state theme variables', async (content) => {
    if (!notifyKeys.every(key => typeof course.themeVariables[key] === 'string')) throw new Error('adapt-contrib-vanilla - notify state theme variables not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check drawer state theme variables', async (content) => {
    if (!drawerKeys.every(key => typeof course.themeVariables[key] === 'string')) throw new Error('adapt-contrib-vanilla - drawer state theme variables not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v9.25.0', { name: 'adapt-contrib-vanilla', version: '9.25.0', framework: '>=5.31.3' });

  testSuccessWhere('correct version with themeVariables', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.17.2' }],
    content: [{ _type: 'course', themeVariables: {} }]
  });

  testSuccessWhere('correct version with some existing state colours', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.17.2' }],
    content: [{ _type: 'course', themeVariables: { 'btn-color-focus': '#123456', 'nav-icon-locked': '#654321' } }]
  });

  testStopWhere('no themeVariables', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.17.2' }],
    content: [{ _type: 'course' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.25.0' }]
  });
});

describe('adapt-contrib-vanilla - v9.25.0 > v9.27.0', async () => {
  let contentObjects;

  whereFromPlugin('adapt-contrib-vanilla - from v9.25.0', { name: 'adapt-contrib-vanilla', version: '<9.27.0' });

  whereContent('adapt-contrib-vanilla - where contentObject', async (content) => {
    contentObjects = content.filter(item => ['page', 'menu'].includes(item._type));
    return contentObjects.length;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._pageHeader._textAlignment._subtitle to contentObject', async (content) => {
    contentObjects.forEach(contentObject => {
      if (!_.has(contentObject, '_vanilla._pageHeader._textAlignment') || _.has(contentObject, '_vanilla._pageHeader._textAlignment._subtitle')) return;
      contentObject._vanilla._pageHeader._textAlignment._subtitle = '';
    });
    return true;
  });

  checkContent('adapt-contrib-vanilla - check contentObject._vanilla._pageHeader._textAlignment._subtitle', async (content) => {
    const isValid = contentObjects.every(contentObject => !_.has(contentObject, '_vanilla._pageHeader._textAlignment') || TEXT_ALIGNMENT_VALUES.includes(contentObject._vanilla._pageHeader._textAlignment._subtitle));
    if (!isValid) throw new Error('adapt-contrib-vanilla - contentObject._vanilla._pageHeader._textAlignment._subtitle not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v9.27.0', { name: 'adapt-contrib-vanilla', version: '9.27.0', framework: '>=5.31.3' });

  testSuccessWhere('correct version with pageHeader textAlignment', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.25.0' }],
    content: [{ _id: 'co-100', _type: 'page', _vanilla: { _pageHeader: { _textAlignment: { _title: 'left', _body: '', _instruction: '' } } } }]
  });

  testSuccessWhere('correct version with no pageHeader textAlignment configured', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.25.0' }],
    content: [{ _id: 'co-100', _type: 'page', _vanilla: { _pageHeader: {} } }]
  });

  testStopWhere('no contentObject', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.25.0' }],
    content: [{ _type: 'course' }, { _id: 'a-100', _type: 'article' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.27.0' }]
  });
});

describe('adapt-contrib-vanilla - v9.27.0 > v9.29.0', async () => {
  let articles, blocks, course;

  whereFromPlugin('adapt-contrib-vanilla - from v9.27.0', { name: 'adapt-contrib-vanilla', version: '<9.29.0' });

  whereContent('adapt-contrib-vanilla - where article, block or themeVariables', async (content) => {
    articles = content.filter(item => item._type === 'article');
    blocks = content.filter(item => item._type === 'block');
    course = getCourse();
    return articles.length || blocks.length || course?.themeVariables;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._articleHeader._backgroundImage to article', async (content) => {
    articles.forEach(article => {
      if (_.has(article, '_vanilla._articleHeader._backgroundImage')) return;
      _.set(article, '_vanilla._articleHeader._backgroundImage', { _xlarge: '', _large: '', _medium: '', _small: '' });
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._articleHeader._backgroundStyles to article', async (content) => {
    articles.forEach(article => {
      if (_.has(article, '_vanilla._articleHeader._backgroundStyles')) return;
      _.set(article, '_vanilla._articleHeader._backgroundStyles', { _backgroundRepeat: 'no-repeat', _backgroundSize: 'cover', _backgroundPosition: 'center top' });
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._articleHeader._minimumHeights to article', async (content) => {
    articles.forEach(article => {
      if (_.has(article, '_vanilla._articleHeader._minimumHeights')) return;
      _.set(article, '_vanilla._articleHeader._minimumHeights', { _xlarge: 0, _large: 0, _medium: 0, _small: 0 });
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._blockHeader._backgroundImage to block', async (content) => {
    blocks.forEach(block => {
      if (_.has(block, '_vanilla._blockHeader._backgroundImage')) return;
      _.set(block, '_vanilla._blockHeader._backgroundImage', { _xlarge: '', _large: '', _medium: '', _small: '' });
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._blockHeader._backgroundStyles to block', async (content) => {
    blocks.forEach(block => {
      if (_.has(block, '_vanilla._blockHeader._backgroundStyles')) return;
      _.set(block, '_vanilla._blockHeader._backgroundStyles', { _backgroundRepeat: 'no-repeat', _backgroundSize: 'cover', _backgroundPosition: 'center top' });
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._blockHeader._minimumHeights to block', async (content) => {
    blocks.forEach(block => {
      if (_.has(block, '_vanilla._blockHeader._minimumHeights')) return;
      _.set(block, '_vanilla._blockHeader._minimumHeights', { _xlarge: 0, _large: 0, _medium: 0, _small: 0 });
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add notify-title-color theme variable to course', async (content) => {
    if (!course?.themeVariables || _.has(course.themeVariables, 'notify-title-color')) return true;
    course.themeVariables['notify-title-color'] = '';
    return true;
  });

  checkContent('adapt-contrib-vanilla - check article._vanilla._articleHeader._backgroundImage', async (content) => {
    const isValid = articles.every(article => {
      const image = _.get(article, '_vanilla._articleHeader._backgroundImage');
      return image && ['_xlarge', '_large', '_medium', '_small'].every(key => typeof image[key] === 'string');
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - article._vanilla._articleHeader._backgroundImage not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check article._vanilla._articleHeader._backgroundStyles', async (content) => {
    const isValid = articles.every(article => {
      const styles = _.get(article, '_vanilla._articleHeader._backgroundStyles');
      return styles && BACKGROUND_REPEAT_VALUES_NARROW.includes(styles._backgroundRepeat) &&
        BACKGROUND_SIZE_VALUES_NARROW.includes(styles._backgroundSize) &&
        BACKGROUND_POSITION_VALUES_NARROW.includes(styles._backgroundPosition);
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - article._vanilla._articleHeader._backgroundStyles not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check article._vanilla._articleHeader._minimumHeights', async (content) => {
    const isValid = articles.every(article => {
      const heights = _.get(article, '_vanilla._articleHeader._minimumHeights');
      return heights && ['_xlarge', '_large', '_medium', '_small'].every(key => typeof heights[key] === 'number');
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - article._vanilla._articleHeader._minimumHeights not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check block._vanilla._blockHeader._backgroundImage', async (content) => {
    const isValid = blocks.every(block => {
      const image = _.get(block, '_vanilla._blockHeader._backgroundImage');
      return image && ['_xlarge', '_large', '_medium', '_small'].every(key => typeof image[key] === 'string');
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - block._vanilla._blockHeader._backgroundImage not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check block._vanilla._blockHeader._backgroundStyles', async (content) => {
    const isValid = blocks.every(block => {
      const styles = _.get(block, '_vanilla._blockHeader._backgroundStyles');
      return styles && BACKGROUND_REPEAT_VALUES_NARROW.includes(styles._backgroundRepeat) &&
        BACKGROUND_SIZE_VALUES_NARROW.includes(styles._backgroundSize) &&
        BACKGROUND_POSITION_VALUES_NARROW.includes(styles._backgroundPosition);
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - block._vanilla._blockHeader._backgroundStyles not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check block._vanilla._blockHeader._minimumHeights', async (content) => {
    const isValid = blocks.every(block => {
      const heights = _.get(block, '_vanilla._blockHeader._minimumHeights');
      return heights && ['_xlarge', '_large', '_medium', '_small'].every(key => typeof heights[key] === 'number');
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - block._vanilla._blockHeader._minimumHeights not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check notify-title-color theme variable', async (content) => {
    if (!course?.themeVariables) return true;
    if (typeof course.themeVariables['notify-title-color'] !== 'string') throw new Error('adapt-contrib-vanilla - notify-title-color theme variable not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v9.29.0', { name: 'adapt-contrib-vanilla', version: '9.29.0', framework: '>=5.31.3' });

  testSuccessWhere('correct version with article, block and themeVariables', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.27.0' }],
    content: [
      { _id: 'a-100', _type: 'article' },
      { _id: 'b-100', _type: 'block' },
      { _type: 'course', themeVariables: {} }
    ]
  });

  testSuccessWhere('correct version with article and block only, no themeVariables', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.27.0' }],
    content: [{ _id: 'a-100', _type: 'article' }, { _type: 'course' }]
  });

  testStopWhere('no article, block or themeVariables', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.27.0' }],
    content: [{ _type: 'course' }, { _type: 'config' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.29.0' }]
  });
});

describe('adapt-contrib-vanilla - v9.29.0 > v9.32.0', async () => {
  let contentObjects;

  whereFromPlugin('adapt-contrib-vanilla - from v9.29.0', { name: 'adapt-contrib-vanilla', version: '<9.32.0' });

  whereContent('adapt-contrib-vanilla - where contentObject', async (content) => {
    contentObjects = content.filter(item => ['page', 'menu'].includes(item._type));
    return contentObjects.length;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._pageHeader._graphic to contentObject', async (content) => {
    contentObjects.forEach(contentObject => {
      if (!_.has(contentObject, '_vanilla._pageHeader') || _.has(contentObject, '_vanilla._pageHeader._graphic')) return;
      _.set(contentObject, '_vanilla._pageHeader._graphic', { _src: '', alt: '' });
    });
    return true;
  });

  checkContent('adapt-contrib-vanilla - check contentObject._vanilla._pageHeader._graphic', async (content) => {
    const isValid = contentObjects.every(contentObject => {
      if (!_.has(contentObject, '_vanilla._pageHeader')) return true;
      const graphic = _.get(contentObject, '_vanilla._pageHeader._graphic');
      return graphic && typeof graphic._src === 'string' && typeof graphic.alt === 'string';
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - contentObject._vanilla._pageHeader._graphic not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v9.32.0', { name: 'adapt-contrib-vanilla', version: '9.32.0', framework: '>=5.31.3' });

  testSuccessWhere('correct version with pageHeader', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.29.0' }],
    content: [{ _id: 'co-100', _type: 'page', _vanilla: { _pageHeader: {} } }]
  });

  testSuccessWhere('correct version with pageHeader already configured', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.29.0' }],
    content: [{ _id: 'co-100', _type: 'page', _vanilla: { _pageHeader: { _graphic: { _src: 'course/en/assets/graphic.png', alt: 'Description' } } } }]
  });

  testStopWhere('no contentObject', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.29.0' }],
    content: [{ _type: 'course' }, { _id: 'a-100', _type: 'article' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.32.0' }]
  });
});

describe('adapt-contrib-vanilla - v9.32.0 > v9.35.0', async () => {
  let course;
  const pageHeaderColorKeys = ['page-header-background-color', 'page-header-title-color', 'page-header-subtitle-color', 'page-header-body-color', 'page-header-instruction-color'];

  whereFromPlugin('adapt-contrib-vanilla - from v9.32.0', { name: 'adapt-contrib-vanilla', version: '<9.35.0' });

  whereContent('adapt-contrib-vanilla - where themeVariables', async (content) => {
    course = getCourse();
    return course?.themeVariables;
  });

  mutateContent('adapt-contrib-vanilla - add page-header colour theme variables to course', async (content) => {
    pageHeaderColorKeys.forEach(key => { if (!_.has(course.themeVariables, key)) course.themeVariables[key] = ''; });
    return true;
  });

  checkContent('adapt-contrib-vanilla - check page-header colour theme variables', async (content) => {
    const isValid = pageHeaderColorKeys.every(key => typeof course.themeVariables[key] === 'string');
    if (!isValid) throw new Error('adapt-contrib-vanilla - page-header colour theme variables not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v9.35.0', { name: 'adapt-contrib-vanilla', version: '9.35.0', framework: '>=5.31.3' });

  testSuccessWhere('correct version with themeVariables', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.32.0' }],
    content: [{ _type: 'course', themeVariables: {} }]
  });

  testSuccessWhere('correct version with existing page-header-title-color', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.32.0' }],
    content: [{ _type: 'course', themeVariables: { 'page-header-title-color': '#123456' } }]
  });

  testStopWhere('no themeVariables', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.32.0' }],
    content: [{ _type: 'course' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.35.0' }]
  });
});

describe('adapt-contrib-vanilla - v9.35.0 > v9.36.0', async () => {
  let course;
  const pullQuoteKeys = ['pull-quote', 'pull-quote-inverted', 'pull-quote-border'];
  const tooltipKeys = ['tooltip-color', 'tooltip-text-color'];

  whereFromPlugin('adapt-contrib-vanilla - from v9.35.0', { name: 'adapt-contrib-vanilla', version: '<9.36.0' });

  whereContent('adapt-contrib-vanilla - where themeVariables', async (content) => {
    course = getCourse();
    return course?.themeVariables;
  });

  mutateContent('adapt-contrib-vanilla - add drawer-item-selected-underline theme variable to course', async (content) => {
    if (_.has(course.themeVariables, 'drawer-item-selected-underline')) return true;
    course.themeVariables['drawer-item-selected-underline'] = '';
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add body-background-color theme variable to course', async (content) => {
    if (_.has(course.themeVariables, 'body-background-color')) return true;
    course.themeVariables['body-background-color'] = '';
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add shadow-opacity theme variable to course', async (content) => {
    if (_.has(course.themeVariables, 'shadow-opacity')) return true;
    course.themeVariables['shadow-opacity'] = '';
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add pull-quote theme variables to course', async (content) => {
    pullQuoteKeys.forEach(key => { if (!_.has(course.themeVariables, key)) course.themeVariables[key] = ''; });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add tooltip theme variables to course', async (content) => {
    tooltipKeys.forEach(key => { if (!_.has(course.themeVariables, key)) course.themeVariables[key] = ''; });
    return true;
  });

  checkContent('adapt-contrib-vanilla - check drawer-item-selected-underline theme variable', async (content) => {
    if (typeof course.themeVariables['drawer-item-selected-underline'] !== 'string') throw new Error('adapt-contrib-vanilla - drawer-item-selected-underline theme variable not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check body-background-color theme variable', async (content) => {
    if (typeof course.themeVariables['body-background-color'] !== 'string') throw new Error('adapt-contrib-vanilla - body-background-color theme variable not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check shadow-opacity theme variable', async (content) => {
    if (typeof course.themeVariables['shadow-opacity'] !== 'string') throw new Error('adapt-contrib-vanilla - shadow-opacity theme variable not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check pull-quote theme variables', async (content) => {
    if (!pullQuoteKeys.every(key => typeof course.themeVariables[key] === 'string')) throw new Error('adapt-contrib-vanilla - pull-quote theme variables not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check tooltip theme variables', async (content) => {
    if (!tooltipKeys.every(key => typeof course.themeVariables[key] === 'string')) throw new Error('adapt-contrib-vanilla - tooltip theme variables not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v9.36.0', { name: 'adapt-contrib-vanilla', version: '9.36.0', framework: '>=5.31.3' });

  testSuccessWhere('correct version with themeVariables', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.35.0' }],
    content: [{ _type: 'course', themeVariables: {} }]
  });

  testSuccessWhere('correct version with some existing values', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.35.0' }],
    content: [{ _type: 'course', themeVariables: { 'pull-quote': '#123456', 'shadow-opacity': '50%' } }]
  });

  testStopWhere('no themeVariables', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.35.0' }],
    content: [{ _type: 'course' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.36.0' }]
  });
});

describe('adapt-contrib-vanilla - v9.36.0 > v9.39.0', async () => {
  let course;

  whereFromPlugin('adapt-contrib-vanilla - from v9.36.0', { name: 'adapt-contrib-vanilla', version: '<9.39.0' });

  whereContent('adapt-contrib-vanilla - where course', async (content) => {
    course = getCourse();
    return course;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._favIcon._svg and _appleTouch to course', async (content) => {
    if (!_.has(course, '_vanilla._favIcon')) _.set(course, '_vanilla._favIcon', {});
    if (!_.has(course, '_vanilla._favIcon._svg')) course._vanilla._favIcon._svg = '';
    if (!_.has(course, '_vanilla._favIcon._appleTouch')) course._vanilla._favIcon._appleTouch = '';
    return true;
  });

  checkContent('adapt-contrib-vanilla - check course._vanilla._favIcon._svg and _appleTouch', async (content) => {
    const isValid = typeof _.get(course, '_vanilla._favIcon._svg') === 'string' && typeof _.get(course, '_vanilla._favIcon._appleTouch') === 'string';
    if (!isValid) throw new Error('adapt-contrib-vanilla - course._vanilla._favIcon._svg or _appleTouch not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v9.39.0', { name: 'adapt-contrib-vanilla', version: '9.39.0', framework: '>=5.31.3' });

  testSuccessWhere('correct version with course content', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.36.0' }],
    content: [{ _type: 'course' }]
  });

  testSuccessWhere('correct version with favIcon already partially configured', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.36.0' }],
    content: [{ _type: 'course', _vanilla: { _favIcon: { _src: 'course/en/assets/favicon.ico' } } }]
  });

  testStopWhere('no course content', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.36.0' }],
    content: [{ _id: 'b-100', _type: 'block' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '9.39.0' }]
  });
});
