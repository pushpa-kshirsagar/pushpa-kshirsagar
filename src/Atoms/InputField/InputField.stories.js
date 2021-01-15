import React from 'react';
import { InputField } from './InputField';

export default {
  title: 'Design System/Atoms/Input Field',
  component: InputField
};
const Template1 = (args) => <InputField {...args} />;

export const InputField1 = Template1.bind({});
InputField1.args = {
  inputFieldLabel: 'Demo',
  inputFieldType: 'text'
};
