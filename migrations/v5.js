import { describe, whereFromPlugin, whereContent, mutateContent, checkContent, updatePlugin, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

const BACKGROUND_REPEAT_VALUES = ['', 'repeat', 'repeat-x', 'repeat-y', 'no-repeat'];
const BACKGROUND_SIZE_VALUES = ['', 'auto', 'cover', 'contain', '100% 100%'];
const BACKGROUND_POSITION_VALUES = ['', 'left top', 'left center', 'left bottom', 'center top', 'center center', 'center bottom', 'right top', 'right center', 'right bottom'];

describe('adapt-contrib-vanilla - v3.1.0 > v5.0.0', async () => {
  let articles, blocks, contentObjects;

  whereFromPlugin('adapt-contrib-vanilla - from v3.1.0', { name: 'adapt-contrib-vanilla', version: '<5.0.0' });

  whereContent('adapt-contrib-vanilla - where article, block or contentObject', async (content) => {
    articles = content.filter(item => item._type === 'article');
    blocks = content.filter(item => item._type === 'block');
    contentObjects = content.filter(item => ['page', 'menu'].includes(item._type));
    return articles.length || blocks.length || contentObjects.length;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._backgroundImage to article, block and contentObject', async (content) => {
    [...articles, ...blocks, ...contentObjects].forEach(item => {
      if (_.has(item, '_vanilla._backgroundImage')) return;
      _.set(item, '_vanilla._backgroundImage', { _large: '', _medium: '', _small: '' });
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._backgroundStyles to article, block and contentObject', async (content) => {
    [...articles, ...blocks, ...contentObjects].forEach(item => {
      if (_.has(item, '_vanilla._backgroundStyles')) return;
      _.set(item, '_vanilla._backgroundStyles', { _backgroundRepeat: '', _backgroundSize: '', _backgroundPosition: '' });
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._minimumHeights to block', async (content) => {
    blocks.forEach(block => {
      if (_.has(block, '_vanilla._minimumHeights')) return;
      _.set(block, '_vanilla._minimumHeights', { _large: 0, _medium: 0, _small: 0 });
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._isDividerBlock to block', async (content) => {
    blocks.forEach(block => {
      if (_.has(block, '_vanilla._isDividerBlock')) return;
      _.set(block, '_vanilla._isDividerBlock', false);
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._pageHeader._backgroundImage to contentObject', async (content) => {
    contentObjects.forEach(contentObject => {
      if (_.has(contentObject, '_vanilla._pageHeader._backgroundImage')) return;
      _.set(contentObject, '_vanilla._pageHeader._backgroundImage', { _large: '', _medium: '', _small: '' });
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._pageHeader._backgroundStyles to contentObject', async (content) => {
    contentObjects.forEach(contentObject => {
      if (_.has(contentObject, '_vanilla._pageHeader._backgroundStyles')) return;
      _.set(contentObject, '_vanilla._pageHeader._backgroundStyles', { _backgroundRepeat: '', _backgroundSize: '', _backgroundPosition: '' });
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._pageHeader._minimumHeights to contentObject', async (content) => {
    contentObjects.forEach(contentObject => {
      if (_.has(contentObject, '_vanilla._pageHeader._minimumHeights')) return;
      _.set(contentObject, '_vanilla._pageHeader._minimumHeights', { _large: 0, _medium: 0, _small: 0 });
    });
    return true;
  });

  checkContent('adapt-contrib-vanilla - check _vanilla._backgroundImage', async (content) => {
    const isValid = [...articles, ...blocks, ...contentObjects].every(item => {
      const image = _.get(item, '_vanilla._backgroundImage');
      return image && ['_large', '_medium', '_small'].every(key => typeof image[key] === 'string');
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - _vanilla._backgroundImage not added to article, block or contentObject');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check _vanilla._backgroundStyles', async (content) => {
    const isValid = [...articles, ...blocks, ...contentObjects].every(item => {
      const styles = _.get(item, '_vanilla._backgroundStyles');
      return styles &&
        BACKGROUND_REPEAT_VALUES.includes(styles._backgroundRepeat) &&
        BACKGROUND_SIZE_VALUES.includes(styles._backgroundSize) &&
        BACKGROUND_POSITION_VALUES.includes(styles._backgroundPosition);
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - _vanilla._backgroundStyles not added to article, block or contentObject');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check block._vanilla._minimumHeights', async (content) => {
    const isValid = blocks.every(block => {
      const heights = _.get(block, '_vanilla._minimumHeights');
      return heights && ['_large', '_medium', '_small'].every(key => typeof heights[key] === 'number');
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - block._vanilla._minimumHeights not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check block._vanilla._isDividerBlock', async (content) => {
    const isValid = blocks.every(block => typeof _.get(block, '_vanilla._isDividerBlock') === 'boolean');
    if (!isValid) throw new Error('adapt-contrib-vanilla - block._vanilla._isDividerBlock not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check contentObject._vanilla._pageHeader._backgroundImage', async (content) => {
    const isValid = contentObjects.every(contentObject => {
      const image = _.get(contentObject, '_vanilla._pageHeader._backgroundImage');
      return image && ['_large', '_medium', '_small'].every(key => typeof image[key] === 'string');
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - contentObject._vanilla._pageHeader._backgroundImage not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check contentObject._vanilla._pageHeader._backgroundStyles', async (content) => {
    const isValid = contentObjects.every(contentObject => {
      const styles = _.get(contentObject, '_vanilla._pageHeader._backgroundStyles');
      return styles &&
        BACKGROUND_REPEAT_VALUES.includes(styles._backgroundRepeat) &&
        BACKGROUND_SIZE_VALUES.includes(styles._backgroundSize) &&
        BACKGROUND_POSITION_VALUES.includes(styles._backgroundPosition);
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - contentObject._vanilla._pageHeader._backgroundStyles not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check contentObject._vanilla._pageHeader._minimumHeights', async (content) => {
    const isValid = contentObjects.every(contentObject => {
      const heights = _.get(contentObject, '_vanilla._pageHeader._minimumHeights');
      return heights && ['_large', '_medium', '_small'].every(key => typeof heights[key] === 'number');
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - contentObject._vanilla._pageHeader._minimumHeights not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v5.0.0', { name: 'adapt-contrib-vanilla', version: '5.0.0', framework: '>=5' });

  testSuccessWhere('correct version with article, block and page/menu contentObjects', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '3.1.0' }],
    content: [
      { _id: 'a-100', _type: 'article' },
      { _id: 'b-100', _type: 'block' },
      { _id: 'co-100', _type: 'page' },
      { _id: 'co-200', _type: 'menu' }
    ]
  });

  testSuccessWhere('correct version with already partially configured content', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '4.1.0' }],
    content: [
      { _id: 'a-100', _type: 'article', _vanilla: { _backgroundImage: { _large: 'a.jpg', _medium: '', _small: '' } } },
      { _id: 'b-100', _type: 'block', _vanilla: { _isDividerBlock: true } },
      { _id: 'co-100', _type: 'page', _vanilla: { _pageHeader: { _backgroundImage: { _large: 'h.jpg', _medium: '', _small: '' } } } }
    ]
  });

  testStopWhere('no article, block or contentObject', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '3.1.0' }],
    content: [{ _type: 'course' }, { _type: 'config' }, { _id: 'c-100', _component: 'text' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '5.0.0' }]
  });
});

describe('adapt-contrib-vanilla - v5.0.0 > v5.4.0', async () => {
  let articles, blocks, contentObjects;

  whereFromPlugin('adapt-contrib-vanilla - from v5.0.0', { name: 'adapt-contrib-vanilla', version: '<5.4.0' });

  whereContent('adapt-contrib-vanilla - where article, block or contentObject', async (content) => {
    articles = content.filter(item => item._type === 'article');
    blocks = content.filter(item => item._type === 'block');
    contentObjects = content.filter(item => ['page', 'menu'].includes(item._type));
    return articles.length || blocks.length || contentObjects.length;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._responsiveClasses to article, block and contentObject', async (content) => {
    [...articles, ...blocks, ...contentObjects].forEach(item => {
      if (_.has(item, '_vanilla._responsiveClasses')) return;
      _.set(item, '_vanilla._responsiveClasses', { _large: '', _medium: '', _small: '' });
    });
    return true;
  });

  checkContent('adapt-contrib-vanilla - check _vanilla._responsiveClasses', async (content) => {
    const isValid = [...articles, ...blocks, ...contentObjects].every(item => {
      const classes = _.get(item, '_vanilla._responsiveClasses');
      return classes && ['_large', '_medium', '_small'].every(key => typeof classes[key] === 'string');
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - _vanilla._responsiveClasses not added to article, block or contentObject');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v5.4.0', { name: 'adapt-contrib-vanilla', version: '5.4.0', framework: '>=5.3' });

  testSuccessWhere('correct version with article, block and page/menu contentObjects', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '5.0.0' }],
    content: [
      { _id: 'a-100', _type: 'article', _vanilla: { _backgroundImage: { _large: '', _medium: '', _small: '' } } },
      { _id: 'b-100', _type: 'block', _vanilla: { _isDividerBlock: false } },
      { _id: 'co-100', _type: 'page', _vanilla: {} },
      { _id: 'co-200', _type: 'menu', _vanilla: {} }
    ]
  });

  testSuccessWhere('correct version with _responsiveClasses already present on some content', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '5.3.0' }],
    content: [
      { _id: 'a-100', _type: 'article', _vanilla: { _responsiveClasses: { _large: 'foo', _medium: '', _small: '' } } },
      { _id: 'b-100', _type: 'block' }
    ]
  });

  testStopWhere('no article, block or contentObject', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '5.0.0' }],
    content: [{ _type: 'course' }, { _type: 'config' }, { _id: 'c-100', _component: 'text' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '5.4.0' }]
  });
});
