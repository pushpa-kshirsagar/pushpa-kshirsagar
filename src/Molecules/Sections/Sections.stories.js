import React from 'react';
import Sections from './Section';

export default {
  title: 'Design System/Molecules/Section',
  component: Sections
};

const Template = (args) => <Sections {...args} />;

export const Section = Template.bind({});
Section.args = {
  isSelected: true
};
