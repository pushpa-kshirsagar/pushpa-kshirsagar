import React from 'react';
import HeaderCard from './HeaderCard';
export default {
  title: 'Design System/Molecules/Display Pane',
  component: HeaderCard
};
const Template = (args) => {
  return (
    <div style={{ maxWidth: '33.33%' }}>
      <HeaderCard {...args} />
    </div>
  );
};

export const DisplayPane1 = Template.bind({});
DisplayPane1.args = {
  className: '',
  displayPane: 'left',
  headerPanelColour: 'blue',
  headerOne: 'dashboard'
};
export const DisplayPane2 = Template.bind({});
DisplayPane2.args = {
  className: '',
  displayPane: 'centre',
  headerPanelColour: 'green',
  headerOne: 'associate',
  headerOneBadgeOne: 'nodes',
  headerOneBadgeTwo: 'distinct',
  headerOneBadgeThree: 'active',
  headerOneBadgeFour: '',
  scanCount: 34
};
export const DisplayPane3 = Template.bind({});
DisplayPane3.args = {
  className: '',
  displayPane: 'right',
  headerPanelColour: 'green',
  headerOne: 'associate',
  headerOneBadgeOne: 'node',
  headerOneBadgeTwo: 'information',
  headerOneBadgeThree: 'all'
};
