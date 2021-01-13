import React from 'react';
import { InputField } from './InputField';

export default {
  title: 'Design System/Atoms/Input Fields',
  component: InputField
};
const Template1 = (args) => <InputField {...args} />;

export const ManualInput = Template1.bind({});
ManualInput.args = {
  inputFieldLabel: 'Demo',
  inputFieldType: 'text'
};
