import React from 'react';

import PopupComponent from './Popup';

export default {
  title: 'Design System/Molecules',
  component: PopupComponent
};

const Template = (args) => <PopupComponent {...args} />;

export const Popup = Template.bind({});
Popup.args = {
  className: null,
  headerOne: 'assessees',
  headerOneBadgeOne: '',
  headerOneBadgeTwo: '',
  headerOneBadgeThree: '',
  headerPanelColour: 'displayPaneLeft',
  isActive: true
};

// export const toolkit = Template.bind({});
// toolkit.args = {
//   label: 'toolkit',
//   Icon: BusinessCenter,
//   mode:'secondary',
//   className:null
// };
