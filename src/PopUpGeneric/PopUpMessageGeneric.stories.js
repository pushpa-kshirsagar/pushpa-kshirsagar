import React from 'react';
import PopUpMessageGenericComponent from './PopUpMessageGeneric';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/PopUpGeneric',
  component: PopUpMessageGenericComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpMessageGenericComponent {...args} />;

export const PopUpMessageGeneric = Template.bind({});
PopUpMessageGeneric.args = {
  className: null,
  headerPanelColour: 'genericOne',
  headerOne: 'culture profile',
  headerOneBadgeOne: 'information',
  textOneOne: 'select',
  textOneTwo: 'one or neither',
  textOneThree: 'culture dimensions',
  textOneFour: 'from the following twelve lists',
  isActive: true
};
