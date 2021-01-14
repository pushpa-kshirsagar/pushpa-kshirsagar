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
  description: 'alias',
  name: 'assesseeName',
  Picture: PersonIcon,
  isIcon: false,
  isNotification: true,
  isPicture: true,
  isRelated: false
};
export const DisplayCard2 = Template.bind({});
DisplayCard2.args = {
  className: 'iguru-rightarrowicon',
  description: 'description',
  name: 'name',
  Icon: ArrowRight,
  isIcon: true,
  isNotification: false,
  isPicture: false,
  isRelated: false
};
export const DisplayCard3 = Template.bind({});
DisplayCard3.args = {
  // className:'iguru-background',
  description: 'description',
  name: 'name',
  Icon: CrossIcon,
  isIcon: true,
  isNotification: false,
  isPicture: false,
  isRelated: true
};
