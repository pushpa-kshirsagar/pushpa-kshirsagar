import React from 'react';
import PopUpTextSheets from './PopUpTextSheet';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/Pop Up',
  component: PopUpTextSheets,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpTextSheets {...args} />;

export const PopUpTextSheet = Template.bind({});
PopUpTextSheet.args = {
  className: null,
  headerPanelColour: 'displayPaneLeft',
  headerOne: 'textsheet',
  isActive: true
};
