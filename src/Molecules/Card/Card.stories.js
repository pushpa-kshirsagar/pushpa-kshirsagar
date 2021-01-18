import React from 'react';
import Card from './Card';
import PersonIcon from '@material-ui/icons/Person';
import AssociateIcon from '@material-ui/icons/Camera';
import ArrowRight from '@material-ui/icons/ChevronRight';
import CrossIcon from '@material-ui/icons/Clear';
export default {
  title: 'Design System/Molecules/Display Card',
  component: Card
};
const Template = (args) => <Card {...args} />;

export const DisplayCard1 = Template.bind({});
DisplayCard1.args = {
  className: '',
  textOne: 'assesseeName',
  textTwo: 'alias',
  ImageOne: PersonIcon,
  isIcon: false,
  isAlertActive: true,
  isImage: true,
  isAlliance: false
};
export const DisplayCard2 = Template.bind({});
DisplayCard2.args = {
  className: 'iguru-rightarrowicon',
  textOne: 'name',
  textTwo: 'description',
  IconOne: ArrowRight,
  isIcon: true,
  isAlertActive: false,
  isImage: false,
  isAlliance: false
};
export const DisplayCard3 = Template.bind({});
DisplayCard3.args = {
  // className:'iguru-background',
  textOne: 'name',
  textTwo: 'description',
  IconOne: CrossIcon,
  isIcon: true,
  isAlertActive: false,
  isImage: false,
  isAlliance: true
};
