import React from 'react';
import { Provider } from 'react-redux';
import DisplayPaneSixHeader from './DisplayPaneSixHeader';
import store from '../../store';
export default {
  title: 'Design System/Molecules/Display Pane',
  component: DisplayPaneSixHeader,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};
const Template = (args) => {
  return (
    <div style={{ maxWidth: '33.33%' }}>
      <DisplayPaneSixHeader {...args} />
    </div>
  );
};

export const DisplayPane4 = Template.bind({});
DisplayPane4.args = {
  className: '',
  headerPanelColour: 'blue',
  headerOne: 'dashboard'
};
