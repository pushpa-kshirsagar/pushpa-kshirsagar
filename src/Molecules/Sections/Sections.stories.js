import React from 'react';
import Sections from './Section';

export default {
  title: 'Design System/Molecules/Section',
  component: Sections
};
const temp1 = () => <div>Section 1 placeholder</div>;
const temp2 = () => <div>Section 2 placeholder</div>;
const temp3 = () => <div>Section 3 placeholder</div>;
const temp4 = () => <div>Section 4 placeholder</div>;


const Template = (args) => <Sections {...args} />;
const numberOfSection = [
  {
    id: 'section1',
    sectionComponent: temp1
  },
  {
    id: 'section2',
    sectionComponent: temp2
  },
  {
    id: 'section3',
    sectionComponent: temp3
  },
  {
    id: 'section4',
    sectionComponent: temp4
  }
];
export const Section = Template.bind({});
Section.args = {
  listSection: numberOfSection
};
