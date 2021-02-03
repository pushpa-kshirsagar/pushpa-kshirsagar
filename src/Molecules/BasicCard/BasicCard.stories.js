import React from 'react';
import BasicCard from './BasicCard';

export default {
  title: 'Design System/Molecules/Display Card',
  component: BasicCard
};
const Template = (args) => {
  return (
    <div style={{ maxWidth: '33.33%' }}>
      <BasicCard {...args} />
    </div>
  );
};

export const DisplayCard4 = Template.bind({});
DisplayCard4.args = {
  className: '',
  labelTextOneOne: 'name',
  textOneOne: 'Sample Text',
  labelTextOneTwo: 'alias',
  textOneTwo: 'No Information',
  isAlertActive: false,
  isFlagActive: false,
  isImageActive: false,
  isVerifiedActiveName: false,
  isVerifiedActivePicture: false
};
