import React from 'react';

import Accordian from './Accordian';
import { Keyboard } from '@material-ui/icons';
import Verified from '../../images/verified.svg';
import TelephoneVerified from '../../images/telephone_verified.svg';
export default {
  title: 'Design System/Molecules/Display Card',
  component: Accordian
};

const Template = (args) => <Accordian {...args} />;

export const DisplayCard4 = Template.bind({});
DisplayCard4.args = {
  className: null,
  header:'allocation',
  label: 'group',
  labelBadgeOne: 'primary',
  labelBadgeTwo: 'secondary',
  isExpanded:true,
  isListOpen:false,
  isList:false,
  IconOne:TelephoneVerified,
  IconTwo:Verified
};

// export const toolkit = Template.bind({});
// toolkit.args = {
//   label: 'toolkit',
//   Icon: BusinessCenter,
//   mode:'secondary',
//   className:null
// };
