import React from 'react';
import BasicCard from './BasicCard';

export default {
  title: 'Design System/Molecules/Display Card',
  component: BasicCard
};
const Template = (args) => <BasicCard {...args} />;

export const DisplayCard4 = Template.bind({});
DisplayCard4.args = {
  className: '',
  textOne: 'Sample Text',
  textTwo: 'No Information',
  isAlertActive: false,
  isFlagActive: false,
  isImage: false,
  isVerifiedActiveName: false,
  isVerifiedActivePicture: false
};
