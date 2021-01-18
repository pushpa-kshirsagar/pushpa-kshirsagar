import React from 'react';
import { SelectField } from './SelectField';

export default {
  title: 'Design System/Atoms/Input Field',
  component: SelectField
};
const Template = (args) => <SelectField {...args} />;

export const InputField2 = Template.bind({});
InputField2.args = {
  tag: 'select1',
  label: 'Demo',
  listSelect: ['a', 'b', 'c'],
};
