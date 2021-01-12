import React from 'react';
import { SelectField } from './SelectField';

export default {
  title: 'Design System/Atoms/SelectField',
  component: SelectField,
};
const Template = (args) => <SelectField {...args} />;

export const SelectFields = Template.bind({});
SelectFields.args = {
  id: 'select1',
  label: 'Demo',
  options: ['a', 'b', 'c'],
};
