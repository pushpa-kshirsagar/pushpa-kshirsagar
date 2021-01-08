import React from 'react';

import { IconButton } from './IconButton';
import { Keyboard, BusinessCenter } from '@material-ui/icons';

export default {
  title: 'IconButton',
  component: IconButton
};

const Template = (args) => <IconButton {...args} />;

export const calculator = Template.bind({});
calculator.args = {
  primary: true,
  label: 'calculator',
  Icon: Keyboard
};

export const toolkit = Template.bind({});
toolkit.args = {
  primary: true,
  label: 'toolkit',
  Icon: BusinessCenter
};