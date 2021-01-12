import React from 'react';
import Card from './Card';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
import ArrowRight from '@material-ui/icons/ChevronRight';

export default {
  title: 'Design System/Molecules/Segments',
  component: Card,
  
};
const Template = (args) => <Card {...args} />;

export const SegmentCore = Template.bind({});
SegmentCore.args = {
  className:'iguru-leftarrowicon',
  description: 'description',
  name: 'name',
  Icon: ArrowRight,
  isIcon:true,
  isNotification:false,
  isPicure:false,
};

export const AssesseeSelf = Template.bind({});
AssesseeSelf.args = {
  className:'',
  description: 'alias',
  name: 'assesseeName',
  Picture: PersonIcon,
  isIcon:false,
  isNotification:true,
  isPicure:true,

};

export const AssociateSelf = Template.bind({});
AssociateSelf.args = {
  className:'',
  name: 'associateName',
  Picture: AssociateIcon,
  isIcon:false,
  isNotification:true,
  isPicure:false,
};

