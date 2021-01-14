import React from 'react';
import { SelectField } from './SelectField';

export default {
  title: 'Design System/Atoms/Input',
  component: SelectField
};
const Template = (args) => <SelectField {...args} />;

export const Input2 = Template.bind({});
Input2.args = {
  inputFieldTag: 'select1',
  inputFieldLabel: 'Demo',
  inputFieldList: ['a', 'b', 'c']
};
