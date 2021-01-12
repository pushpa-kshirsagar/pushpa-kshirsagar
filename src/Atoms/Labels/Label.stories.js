import React from 'react';
import { Label } from './Label';

export default {
  title: 'Design System/Atoms/Labels',
  component: Label,
  argTypes: {
    colour: { control: 'color' },
  },
};
const Template = (args) => <Label {...args} />;

export const Labels = Template.bind({});
Labels.args = {
  alignment: 'left',
  className: '',
  size: 'medium',
  innerText: 'Sample Text',
  colour: '#000000',
  isBadge: false
};
