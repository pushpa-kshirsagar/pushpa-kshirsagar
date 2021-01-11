import React from 'react';

import IconButton from './IconButton';
import { Keyboard, BusinessCenter } from '@material-ui/icons';

export default {
  title: 'Design System/Molecules/IconButton',
  component: IconButton
};

const Template = (args) => <IconButton {...args} />;

export const calculator = Template.bind({});
calculator.args = {
  label: 'calculator',
  Icon: Keyboard,
  mode:'primary',
  className:null
};

export const toolkit = Template.bind({});
toolkit.args = {
  label: 'toolkit',
  Icon: BusinessCenter,
  mode:'secondary',
  className:null
};