import React from 'react';
import { SelectField } from './SelectField';

export default {
  title: 'Design System/Atoms/Input Fields',
  component: SelectField,
};
const Template = (args) => <SelectField {...args} />;

export const SelectInput = Template.bind({});
SelectInput.args = {
  inputFieldTag: 'select1',
  inputFieldLabel: 'Demo',
  inputFieldList: ['a', 'b', 'c']
};
