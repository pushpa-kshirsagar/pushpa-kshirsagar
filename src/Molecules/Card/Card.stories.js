import React from 'react';
import Card from './Card';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
import ArrowRight from '@material-ui/icons/ChevronRight';

export default {
  title: 'Design System/Molecules/Card',
  component: Card,
  
};
const Template = (args) => <Card {...args} />;

export const CardSimple = Template.bind({});
CardSimple.args = {
  name: 'name',
  description: 'description',
  ImgIcon: ArrowRight,
  isImage:false,
  isNotification:false,
  className:'iguru-leftarrowicon'
};

export const CardAssessee = Template.bind({});
CardAssessee.args = {
  name: 'assesseeName',
  description: 'alias',
  ImgIcon: PersonIcon,
  isImage:true,
  isNotification:true,
  className:'',

};

export const CardAssociate = Template.bind({});
CardAssociate.args = {
  name: 'associateName',
  ImgIcon: AssociateIcon,
  isImage:true,
  isNotification:true,
  className:'',
};

