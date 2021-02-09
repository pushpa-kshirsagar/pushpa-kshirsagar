import React from 'react';
import HeaderCard from '../../Molecules/Headers/HeaderCard';
import CrossIcon from '@material-ui/icons/Clear';
import NavigatorIcon from '@material-ui/icons/OpenWith';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';
import './DisplayPaneFour.css';
import Card from '../../Molecules/Card/Card';
import FooterIcon from '../../Molecules/FooterIcon/FooterIcon';
import { NAVIGATOR_MODE } from '../../actionType';
import { useDispatch, useSelector } from 'react-redux';
// import LaftPaneFooter from '../../Molecules/LaftPaneFooter/LaftPaneFooter';
import DisplayPaneFourFooter from './DisplayPaneFourFooter';

export const DisplayPaneFour = () => {
  const dispatch = useDispatch();
  const { navigatorIcon, FilterMode } = useSelector((state) => state.FilterReducer);
  const onClickFooter = (e) => {
    dispatch({ type: NAVIGATOR_MODE });
  };

  const primaryIcon = [];
  const secondaryIcon = [
    { label: 'first', onClick: onClickFooter, Icon: FirstPage },
    { label: 'previous', onClick: onClickFooter, Icon: ArrowLeft },
    { label: 'next', onClick: onClickFooter, Icon: ArrowRight },
    { label: 'last', onClick: onClickFooter, Icon: LastPage }
  ];
  return (
    <>
      <div>
        <HeaderCard
          className=""
          displayPane="left"
          headerOne="dashboard"
          headerOneBadgeOne=""
          headerPanelColour="blue"
        />
      </div>
      <div className="containerPadding">
        <div className="containerPadding">
          <Card IconOne={CrossIcon} className="" isIcon textOneOne="--" textTwoOne="" />
        </div>
        <div className="containerPadding">
          <div
            style={{
              boxShadow:
                'rgb(0 0 0 / 20%) 0px 1px 5px 0px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 3px 1px -2px',
              height: 'calc(100vh - 232px)'
            }}
          ></div>
        </div>
        <DisplayPaneFourFooter />
        {/* <FooterIcon
          FilterModeEnable={false}
          FilterMode={FilterMode}
          onClick={onClickFooter}
          primaryIcon={primaryIcon}
          secondaryIcon={secondaryIcon}
        /> */}
      </div>
    </>
  );
};

export default DisplayPaneFour;
