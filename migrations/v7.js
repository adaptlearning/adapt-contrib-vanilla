import { describe, whereFromPlugin, whereContent, mutateContent, checkContent, updatePlugin, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

const COMPONENT_VERTICAL_ALIGNMENT_VALUES = ['top', 'center', 'bottom'];

describe('adapt-contrib-vanilla - v5.4.0 > v7.1.0', async () => {
  let blocks;

  whereFromPlugin('adapt-contrib-vanilla - from v5.4.0', { name: 'adapt-contrib-vanilla', version: '<7.1.0' });

  whereContent('adapt-contrib-vanilla - where block', async (content) => {
    blocks = content.filter(item => item._type === 'block');
    return blocks.length;
  });

  mutateContent('adapt-contrib-vanilla - add _vanilla._componentVerticalAlignment to block', async (content) => {
    blocks.forEach(block => {
      if (_.has(block, '_vanilla._componentVerticalAlignment')) return;
      _.set(block, '_vanilla._componentVerticalAlignment', 'top');
    });
    return true;
  });

  checkContent('adapt-contrib-vanilla - check block._vanilla._componentVerticalAlignment', async (content) => {
    const isValid = blocks.every(block => COMPONENT_VERTICAL_ALIGNMENT_VALUES.includes(_.get(block, '_vanilla._componentVerticalAlignment')));
    if (!isValid) throw new Error('adapt-contrib-vanilla - block._vanilla._componentVerticalAlignment not added');
    return true;
  });

  updatePlugin('adapt-contrib-vanilla - update to v7.1.0', { name: 'adapt-contrib-vanilla', version: '7.1.0', framework: '>=5.20.1' });

  testSuccessWhere('correct version with block content', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '5.4.0' }],
    content: [{ _id: 'b-100', _type: 'block' }]
  });

  testSuccessWhere('correct version with _vanilla already partially configured', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '7.0.0' }],
    content: [{ _id: 'b-100', _type: 'block', _vanilla: { _isDividerBlock: true } }]
  });

  testStopWhere('no block content', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '5.4.0' }],
    content: [{ _type: 'course' }, { _id: 'a-100', _type: 'article' }]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-vanilla', version: '7.1.0' }]
  });
});
