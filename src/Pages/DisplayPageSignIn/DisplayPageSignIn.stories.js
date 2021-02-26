import React from 'react';
import SignIn from './DisplayPageSignIn';

export default {
  title: 'Design System/Pages',
  component: SignIn
};
const Template1 = (args) => <SignIn {...args} />;

export const DisplayPageSignIn = Template1.bind({});
DisplayPageSignIn.args = {};
