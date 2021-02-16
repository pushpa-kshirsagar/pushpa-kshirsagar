import React from 'react';
import BasicCard from './BasicCard';

export default {
  title: 'Design System/Molecules/Display Panel',
  component: BasicCard
};
const Template = (args) => {
  return (
    <div style={{ maxWidth: '33.33%' }}>
      <BasicCard {...args} />
    </div>
  );
};

export const DisplayPanel4 = Template.bind({});
DisplayPanel4.args = {
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
