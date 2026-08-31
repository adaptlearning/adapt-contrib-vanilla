import { describe, whereFromPlugin, whereContent, mutateContent, checkContent, updatePlugin, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

const PADDING_VALUES = ['double', 'standard', 'half', 'remove'];
const TEXT_ALIGNMENT_VALUES = ['', 'left', 'center', 'right'];

describe('adapt-contrib-vanilla - v7.1.0 > v8.0.0', async () => {
  let blocks;

  whereFromPlugin('adapt-contrib-vanilla - from v7.1.0', { name: 'adapt-contrib-vanilla', version: '<8.0.0' });

  whereContent('adapt-contrib-vanilla - where block', async (content) => {
    blocks = content.filter(item => item._type === 'block');
    return blocks.length;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._paddingTop to block', async (content) => {
    blocks.forEach(block => {
      if (_.has(block, '_vanilla._paddingTop')) return;
      _.set(block, '_vanilla._paddingTop', 'standard');
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._paddingBottom to block', async (content) => {
    blocks.forEach(block => {
      if (_.has(block, '_vanilla._paddingBottom')) return;
      _.set(block, '_vanilla._paddingBottom', 'standard');
    });
    return true;
  });

  checkContent('adapt-contrib-vanilla - check block._vanilla._paddingTop', async (content) => {
    const isValid = blocks.every(block => PADDING_VALUES.includes(_.get(block, '_vanilla._paddingTop')));
    if (!isValid) throw new Error('adapt-contrib-vanilla - block._vanilla._paddingTop not added');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check block._vanilla._paddingBottom', async (content) => {
    const isValid = blocks.every(block => PADDING_VALUES.includes(_.get(block, '_vanilla._paddingBottom')));
    if (!isValid) throw new Error('adapt-contrib-vanilla - block._vanilla._paddingBottom not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v8.0.0', { name: 'adapt-contrib-vanilla', version: '8.0.0', framework: '>=5.22.9' });

  testSuccessWhere('correct version with block content', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '7.1.0' }],
    content: [{ _id: 'b-100', _type: 'block' }]
  });

  testSuccessWhere('correct version with _vanilla already partially configured', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '7.1.0' }],
    content: [{ _id: 'b-100', _type: 'block', _vanilla: { _paddingTop: 'double' } }]
  });

  testStopWhere('no block content', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '7.1.0' }],
    content: [{ _type: 'course' }, { _id: 'a-100', _type: 'article' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '8.0.0' }]
  });
});

describe('adapt-contrib-vanilla - v8.0.0 > v8.1.0', async () => {
  let articles, blocks, components, contentObjects;

  whereFromPlugin('adapt-contrib-vanilla - from v8.0.0', { name: 'adapt-contrib-vanilla', version: '<8.1.0' });

  whereContent('adapt-contrib-vanilla - where article, block, component or contentObject', async (content) => {
    articles = content.filter(item => item._type === 'article');
    blocks = content.filter(item => item._type === 'block');
    components = content.filter(item => item._type === 'component');
    contentObjects = content.filter(item => ['page', 'menu'].includes(item._type));
    return articles.length || blocks.length || components.length || contentObjects.length;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._textAlignment to article, block and component', async (content) => {
    [...articles, ...blocks, ...components].forEach(item => {
      if (_.has(item, '_vanilla._textAlignment')) return;
      _.set(item, '_vanilla._textAlignment', { _title: '', _body: '', _instruction: '' });
    });
    return true;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._pageHeader._textAlignment to contentObject', async (content) => {
    contentObjects.forEach(contentObject => {
      if (_.has(contentObject, '_vanilla._pageHeader._textAlignment')) return;
      _.set(contentObject, '_vanilla._pageHeader._textAlignment', { _title: '', _body: '', _instruction: '' });
    });
    return true;
  });

  checkContent('adapt-contrib-vanilla - check _vanilla._textAlignment', async (content) => {
    const isValid = [...articles, ...blocks, ...components].every(item => {
      const alignment = _.get(item, '_vanilla._textAlignment');
      return alignment && ['_title', '_body', '_instruction'].every(key => TEXT_ALIGNMENT_VALUES.includes(alignment[key]));
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - _vanilla._textAlignment not added to article, block or component');
    return true;
  });

  checkContent('adapt-contrib-vanilla - check contentObject._vanilla._pageHeader._textAlignment', async (content) => {
    const isValid = contentObjects.every(contentObject => {
      const alignment = _.get(contentObject, '_vanilla._pageHeader._textAlignment');
      return alignment && ['_title', '_body', '_instruction'].every(key => TEXT_ALIGNMENT_VALUES.includes(alignment[key]));
    });
    if (!isValid) throw new Error('adapt-contrib-vanilla - contentObject._vanilla._pageHeader._textAlignment not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v8.1.0', { name: 'adapt-contrib-vanilla', version: '8.1.0', framework: '>=5.22.9' });

  testSuccessWhere('correct version with article, block, component and page/menu contentObjects', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '8.0.0' }],
    content: [
      { _id: 'a-100', _type: 'article' },
      { _id: 'b-100', _type: 'block' },
      { _id: 'c-100', _type: 'component' },
      { _id: 'co-100', _type: 'page' },
      { _id: 'co-200', _type: 'menu' }
    ]
  });

  testSuccessWhere('correct version with _vanilla already partially configured', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '8.0.0' }],
    content: [
      { _id: 'a-100', _type: 'article', _vanilla: { _textAlignment: { _title: 'left', _body: '', _instruction: '' } } },
      { _id: 'co-100', _type: 'page', _vanilla: { _pageHeader: { _textAlignment: { _title: 'center', _body: '', _instruction: '' } } } }
    ]
  });

  testStopWhere('no article, block, component or contentObject', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '8.0.0' }],
    content: [{ _type: 'course' }, { _type: 'config' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '8.1.0' }]
  });
});
