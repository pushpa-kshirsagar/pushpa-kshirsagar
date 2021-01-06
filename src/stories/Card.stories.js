import React from 'react';
import { Card } from './Atoms/Card';
export default {
  title: 'Example/Card',
  component: Card,
};
const Template = (args) => <Card {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Card',
};