import React from 'react';
import LabelComp from './Label';

export default {
  title: 'Design System/Atoms',
  component: LabelComp,
};
const Template = (args) => <LabelComp {...args} />;

export const AlphanumericItem = Template.bind({});
AlphanumericItem.args = {
  className: '',
  colour: '#000000',
  fontSize: '1.2rem',
  text: 'Sample Text',
  isBadge: false
};
