import React from 'react';

import Button from './IconButton';
import { Keyboard } from '@material-ui/icons';

export default {
  title: 'Design System/Molecules/Button',
  component: Button
};

const Template = (args) => <Button {...args} />;

export const ButtonIcon = Template.bind({});
ButtonIcon.args = {
  className: null,
  Icon: Keyboard,
  label: 'calculator',
  colour: 'displayPaneLeft'
};

// export const toolkit = Template.bind({});
// toolkit.args = {
//   label: 'toolkit',
//   Icon: BusinessCenter,
//   mode:'secondary',
//   className:null
// };
