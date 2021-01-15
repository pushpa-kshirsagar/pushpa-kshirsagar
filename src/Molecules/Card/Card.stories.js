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
  textOneLabel: 'assesseeName',
  textTwoLabel: 'alias',
  Image: PersonIcon,
  isNotification: true,
  isImage: true
};
export const DisplayCard2 = Template.bind({});
DisplayCard2.args = {
  className: 'iguru-rightarrowicon',
  textOneLabel: 'name',
  textTwoLabel: 'description',
  Icon: ArrowRight,
  isIcon: true
};
export const DisplayCard3 = Template.bind({});
DisplayCard3.args = {
  className:'',
  textOneLabel: 'name',
  textTwoLabel: 'description',
  name: 'name',
  Icon: CrossIcon,
  isIcon: true,
  isRelated: true
};
