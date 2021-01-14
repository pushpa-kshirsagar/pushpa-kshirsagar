import React from 'react';
import LabelComp from './Label';

export default {
  title: 'Design System/Atoms',
  component: LabelComp,
  argTypes: {
    colour: { control: 'color' }
  }
};
const Template = (args) => <LabelComp {...args} />;

export const Label = Template.bind({});
Label.args = {
  alignment: 'left',
  className: '',
  size: 'medium',
  innerText: 'Sample Text',
  colour: '#000000',
  isBadge: false
};
