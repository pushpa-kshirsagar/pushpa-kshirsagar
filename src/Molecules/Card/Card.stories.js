import React from 'react';
import Card from './Card';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
import ArrowRight from '@material-ui/icons/ChevronRight';
import CrossIcon from '@material-ui/icons/Clear';
export default {
  title: 'Design System/Molecules/Segments',
  component: Card,
  
};
const Template = (args) => <Card {...args} />;



export const AssesseeSelf = Template.bind({});
AssesseeSelf.args = {
  className:'',
  description: 'alias',
  name: 'assesseeName',
  Picture: PersonIcon,
  isIcon:false,
  isNotification:true,
  isPicture:true,
  isRelated:false,

};

export const AssociateSelf = Template.bind({});
AssociateSelf.args = {
  className:'',
  name: 'associateName',
  Picture: AssociateIcon,
  isIcon:false,
  isNotification:true,
  isPicture:false,
  isRelated:false,
};
export const SegmentCore = Template.bind({});
SegmentCore.args = {
  className:'iguru-rightarrowicon',
  description: 'description',
  name: 'name',
  Icon: ArrowRight,
  isIcon:true,
  isNotification:false,
  isPicture:false,
  isRelated:false,
};
export const SegmentRelated = Template.bind({});
SegmentRelated.args = {
  // className:'iguru-background',
  description: 'description',
  name: 'name',
  Icon: CrossIcon,
  isIcon:true,
  isNotification:false,
  isPicture:false,
  isRelated:true,
};

