import React from 'react';
import store from '../../store';
import { Provider } from 'react-redux';
import FooterIconComponent from './FooterIcon';
import { FilterList } from '@material-ui/icons';

export default {
  title: 'Design System/Molecules/FooterIcon',
  component: FooterIconComponent,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
};

const Template = (args) => <FooterIconComponent {...args} />;
// const { FilterModeEnable, FilterMode } = useSelector((state) => state.PopUpReducer);
// const dispatch = useDispatch();
// const onClickFooter = (e) => {
//   dispatch({ type: FILTERMODE });
// };
export const FooterIcon = Template.bind({});
FooterIcon.args = {
  className: null,
  primaryIcon: [{ label: 'sift', onClick: null, Icon: FilterList }],
  secondaryIcon: [
    { label: 'suspended ', onClick: null, Icon: FilterList },
    { label: 'terminated', onClick: null, Icon: FilterList },
    { label: 'unverified', onClick: null, Icon: FilterList }
  ],
  FilterModeEnable: false
};
