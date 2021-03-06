import React from 'react';

import DisplayPanelAccordian from './DisplayPanelAccordian';
// import { Keyboard } from '@material-ui/icons';
import TelephoneVerified from '@material-ui/icons/Call';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
export default {
  title: 'Design System/Molecules/Display Panel',
  component: DisplayPanelAccordian
};

const Template = (args) => <DisplayPanelAccordian {...args} />;

export const DisplayPanel5 = Template.bind({});
DisplayPanel5.args = {
  className: null,
  headerOne: 'allocation',
  labelTextOneOne: 'group',
  labelTextOneOneBadgeOne: 'primary',
  labelTextOneOneBadgeTwo: 'secondary',
  labelTextOneOneBadgeThree: '',
  labelTextOneOneBadgeFour: '',
  textOneOne: 'sample@gmail.com',
  IconOne: TelephoneVerified,
  IconTwo: VerifiedUserIcon,
  isDisplayCardExpanded: true,
  isListSelect: true
  // isListSelectExpanded: false,

  // allData:[{
  //   headerOne: 'allocation',
  //   isDisplayCardExpanded: true,
  //   dataTwo: [
  //     {
  //       labelTextOne: 'group',
  //       labelTextOneBadgeOne: 'primary',
  //       labelTextOneBadgeTwo: 'secondary',
  //       isListSelect: true,
  //       isListSelectExpanded: false
  //     },
  //     {
  //       labelTextOne: 'manager',
  //       labelTextOneBadgeOne: 'primary',
  //       labelTextOneBadgeTwo: 'secondary',
  //       isListSelect: true,
  //       isListSelectExpanded: false
  //     }
  //   ]
  // }]
};

// export const toolkit = Template.bind({});
// toolkit.args = {
//   label: 'toolkit',
//   Icon: BusinessCenter,
//   mode:'secondary',
//   className:null
// };
