import React from 'react';
import { SelectField } from './SelectField';

export default {
  title: 'Design System/Atoms/SelectField',
  component: SelectField,
};
const Template = (args) => <SelectField {...args} />;

export const InputFields = Template.bind({});
InputFields.args = {
  selectId: 'select1',
  selectLabel: 'Demo',
  selectOption: ['a', 'b', 'c'],
};
