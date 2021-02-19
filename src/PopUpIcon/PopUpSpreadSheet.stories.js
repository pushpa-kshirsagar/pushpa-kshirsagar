import React from 'react';
import PopUpSpreadSheetComponent from './PopUpSpreadSheet';
import { Provider } from 'react-redux';
import store from '../store';

export default {
  title: 'Design System/Molecules/PopUpIcon',
  component: PopUpSpreadSheetComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <PopUpSpreadSheetComponent {...args} />;

export const PopUpSpreadSheet = Template.bind({});
PopUpSpreadSheet.args = {
  className: null,
  headerPanelColour: 'displayPaneLeft',
  headerOne: 'spreadsheet',
  isActive: true
};
