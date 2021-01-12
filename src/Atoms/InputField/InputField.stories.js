import React from 'react';
import { InputField } from './InputField';

export default {
  title: 'Design System/Atoms/InputField',
  component: InputField,
};
const Template = (args) => <InputField {...args} />;

export const InputFields = Template.bind({});
InputFields.args = {
  inputLabel: 'Demo',
  inputType: 'text',
};
