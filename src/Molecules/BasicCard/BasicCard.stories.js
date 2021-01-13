import React from 'react';
import BasicCard from './BasicCard';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
import ArrowRight from '@material-ui/icons/ChevronRight';

export default {
  title: 'Design System/Molecules/BasicCard',
  component: BasicCard,
  
};
const Template = (args) => <BasicCard {...args} />;

export const BasicCards = Template.bind({});
BasicCards.args = {
 
};