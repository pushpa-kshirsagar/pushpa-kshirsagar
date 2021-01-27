import React from 'react';

import PopupComponent from './PopupContent';

export default {
  title: 'Design System/Molecules/Pop Up',
  component: PopupComponent
};

const Template = (args) => <PopupComponent {...args} />;

export const PopUp1 = Template.bind({});
PopUp1.args = {
  className: null,
  headerPanelColour: 'displayPaneLeft',
  headerOne: 'assessees',
  headerOneBadgeOne: '',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  isActive: true
};

// export const toolkit = Template.bind({});
// toolkit.args = {
//   label: 'toolkit',
//   Icon: BusinessCenter,
//   mode:'secondary',
//   className:null
// };
