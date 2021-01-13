import React from 'react';
import Lists from './List';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
import ArrowRight from '@material-ui/icons/ChevronRight';

export default {
  title: 'Design System/Molecules/List',
  component: Lists,
  
};
const Template = (args) => <Lists {...args} />;

export const List = Template.bind({});
List.args = {
  name:'name',
  description:'description',
  status:'active',
  isNotification:true,
  isFlaged:true,
  isSelected:true,
};


