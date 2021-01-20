import React from 'react';

import KeyCard from './KeyCard';
import { Keyboard } from '@material-ui/icons';
import TelephoneVerified from '@material-ui/icons/Call';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
export default {
  title: 'Design System/Molecules/Display Card',
  component: KeyCard
};

const Template = (args) => <KeyCard {...args} />;

export const DisplayCard6 = Template.bind({});
DisplayCard6.args = {
  className: null,
  labelTextOneOne: 'group',
  labelTextOneOneBadgeOne: 'primary',
  labelTextOneOneBadgeTwo: 'secondary',
  labelTextOneOneBadgeThree: '',
  labelTextOneOneBadgeFour: '',
  textOneOne: 'sample@gmail.com',
  IconOne: TelephoneVerified,
  IconTwo: VerifiedUserIcon,
  isListSelect: true,
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
