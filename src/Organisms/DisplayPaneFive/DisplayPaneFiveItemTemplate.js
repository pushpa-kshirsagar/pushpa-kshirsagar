import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE, SET_POPUP_VALUE } from '../../actionType';
import Radio from '@material-ui/core/Radio';
import ReactHTMLParser from 'react-html-parser';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PopUpTextSheet from '../../PopUpIcon/PopUpTextSheet';
import { Checkbox } from '@material-ui/core';
import { CheckBox } from '@material-ui/icons';
import { label } from 'aws-amplify';

const DisplayPaneFiveItemTemplate = (props) => {
  const dispatch = useDispatch();
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
  const { isPopUpValue, popupMode } = useSelector((state) => state.PopUpReducer);
  const { reviewMode, responseObject } = useSelector((state) => state.DisplayPaneThreeReducer);
  const optionLabel =
    "<span>response</span>&nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp;";
  const optionLabel1 =
    "<span>response</span>&nbsp <span class='iguru-header-badge1_1'>choice</span>&nbsp;";
  const itemLabel = '<span>item</span>&nbsp';
  const itemLabelText =
    "<span>item</span> &nbsp <span class='iguru-header-badge1_0'>label</span>&nbsp;";
  const responseLabel =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>label</span>&nbsp;";
  const response = '<p><span>response</span></p> &nbsp ';
  const itemDescription =
    "<span>item</span> &nbsp <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const responseDescription =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const responseChoiceDescription =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_0'>choice</span>&nbsp; <span class='iguru-header-badge1_0'>explanation</span>&nbsp;";
  const responseChoiceDescription1 =
    "<span>response</span> &nbsp <span class='iguru-header-badge1_1'>choice</span>&nbsp; <span class='iguru-header-badge1_1'>explanation</span>&nbsp;";
  const itemFrameworkOneResponseChoice =
    itemInformation?.informationFramework?.itemFrameworkOne?.itemFrameworkOneResponseChoice || [];
  const itemFrameworkOne = itemInformation?.informationFramework?.itemFrameworkOne;
  const itemFrameworkOneSection = itemFrameworkOne.itemFrameworkOneSection;
  const { setSelectedChoiceObject, itemType } = props;
  // const [subItemList, setSubItemList] = useState(['item-1', 'item-2', 'item-3']);
  const [scaleList, setScaleList] = useState(['scale-1', 'scale-2', 'scale-3']);
  const [liketcorrect, setliketcorrect] = useState('');
  const [lab, setLabel] = useState(true);
  const useStyles = makeStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent'
      }
    },
    icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5'
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)'
      }
    },
    checkedIcon: {
      backgroundColor: '#137cbd',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""'
      },
      'input:hover ~ &': {
        backgroundColor: '#106ba3'
      }
    }
  });
  function StyledRadio(props) {
    const classes = useStyles();

    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }

  const handleClick = (event) => {
    console.log('ONCHANGE ', event.target.value);
    if (itemFrameworkOne.itemFrameworkOneResponseCorrect[0] === event.target.value) {
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneResponseCorrect',
          value: []
        }
      });
    } else {
      dispatch({
        type: SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
        payload: {
          stateName: 'itemFrameworkOneResponseCorrect',
          value: [event.target.value]
        }
      });
    }
  };
  const isHrSetup = false;
  // console.log('responseObject', responseObject);
  console.log('itemFrameworkOne', itemFrameworkOne);
  return (
    <>
      <div>
        <div
          style={{
            height: '55px'
          }}
        ></div>
      </div>
    </>
  );
};

export default DisplayPaneFiveItemTemplate;
