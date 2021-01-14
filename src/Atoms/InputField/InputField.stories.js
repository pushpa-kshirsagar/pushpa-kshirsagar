import React from 'react';
import { InputField } from './InputField';

export default {
  title: 'Design System/Atoms/Input',
  component: InputField
};
const Template1 = (args) => <InputField {...args} />;

export const Input1 = Template1.bind({});
Input1.args = {
  inputFieldLabel: 'Demo',
  inputFieldType: 'text'
};
