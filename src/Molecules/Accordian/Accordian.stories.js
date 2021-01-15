import React from 'react';

import Accordian from './Accordian';
import { Keyboard } from '@material-ui/icons';
import TelephoneVerified from '@material-ui/icons/Call';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
export default {
  title: 'Design System/Molecules/Display Card',
  component: Accordian
};

const Template = (args) => <Accordian {...args} />;

export const DisplayCard4 = Template.bind({});
DisplayCard4.args = {
  className: null,
  headerLabel:'allocation',
  textOneLabel: 'group',
  textOneLabelBadgeOne: 'primary',
  textOneLabelBadgeTwo: 'secondary',
  textOne:'sample@gmail.com',
  isDisplayCardExpanded:true,
  isTextList:true,
  isTextListExpanded:false,
  IconOne:TelephoneVerified,
  IconTwo:VerifiedUserIcon,
};

// export const toolkit = Template.bind({});
// toolkit.args = {
//   label: 'toolkit',
//   Icon: BusinessCenter,
//   mode:'secondary',
//   className:null
// };
