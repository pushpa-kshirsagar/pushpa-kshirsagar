import React from 'react';
import { Label } from './Labels';

export default {
  title: 'Design System/Atoms/Lables',
  component: Label,
  argTypes: {
    color: { control: 'color' },
  },
};
const Template = (args) => <Label {...args} />;

export const Labels = Template.bind({});
Labels.args = {
  alignment: 'left',
  className: '',
  size: 'md',
  innerText: 'Demo Text',
  color: '#000000',
  isBadge: false
};
