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
  className: '',
  colour: '#000000',
  fontSize: '1.2rem',
  text: 'Sample Text',
  isBadge: false
};
