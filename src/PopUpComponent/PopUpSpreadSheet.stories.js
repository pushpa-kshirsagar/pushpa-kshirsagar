import React from 'react';
import PopUpSpreadSheets from './PopUpSpreadSheet';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/Pop Up',
  component: PopUpSpreadSheets,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpSpreadSheets {...args} />;

export const PopUpSpreadSheet = Template.bind({});
PopUpSpreadSheet.args = {
  className: null,
  headerPanelColour: 'displayPaneLeft',
  headerOne: 'spreadsheet',
  isActive: true
};
