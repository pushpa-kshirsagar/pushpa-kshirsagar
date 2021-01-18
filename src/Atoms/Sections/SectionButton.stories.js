import React from 'react';
import SectionButton from './SectionButton';

export default {
  title: 'Design System/Atoms/Section',
  component: SectionButton
};

const Template = (args) => <SectionButton {...args} />;

export const Button = Template.bind({});
Button.args = {
  className: '',
  isSelected: true
};
