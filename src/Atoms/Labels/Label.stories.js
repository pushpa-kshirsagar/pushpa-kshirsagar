import React from 'react';
import LabelComp from './Label';

export default {
  title: 'Design System/Atoms',
  component: LabelComp,
  argTypes: {
    labelColour: { control: 'color' }
  }
};
const Template = (args) => <LabelComp {...args} />;

export const Label = Template.bind({});
Label.args = {
  className: '',
  labelSize: '1.2rem',
  labelText: 'Sample Text',
  labelColour: '#000000',
  isBadge: false
};
