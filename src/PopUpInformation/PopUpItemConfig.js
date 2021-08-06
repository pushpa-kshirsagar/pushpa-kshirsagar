import React, { Fragment, useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import Popup from '../Molecules/PopUp/PopUp';
import PopupHeader from '../Molecules/PopUp/PopUpHeader';
import { InputLabel, FormControl, Checkbox } from '@material-ui/core';
import InputFeild from '../Atoms/InputField/InputField';
import SelectField from '../Atoms/SelectField/SelectField';
import '../Molecules/PopUp/PopUp.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
    POPUP_CLOSE,
    SET_ITEM_FRAMEWORK_DYNAMIC_SINGLE_STATE,
    SET_NEXT_POPUP
} from '../actionType';
import InfoToolTip from '../Atoms/InfoToolTip/InfoToolTip';
import { REQUIRED_ERROR_MESSAGE } from '../errorMessage';
import { input } from 'aws-amplify';
import { createNameWithBadge } from '../Actions/StatusAction';

const PopUpItemConfig = (props) => {

    const dispatch = useDispatch();
    const {
        isActive,
        primaryheader,
        primaryheaderTwo = '',
        inputHeader,
        headerPanelColour,
        headerOne,
        headerOneBadgeOne,
        choiceOb = null,
        basicInfo,
        mode,
        isItemFramework = false,
    } = props;

    const handleClick = () => {
        dispatch({ type: POPUP_CLOSE });
    };

    return (
        <div>
            <Popup isActive={isActive}>
                <PopupHeader
                    headerPanelColour={headerPanelColour}
                    headerOne={headerOne}
                    headerOneBadgeOne={headerOneBadgeOne}
                    onClick={handleClick}
                    mode={mode}
                />
                <DialogContent
                    className={['popupContent', 'fixed10PadDim', 'revisePopupContent'].join(' ')}
                >
                    <div className={'fitContent'}>
                        <div className={['PopupFormBox', 'labelPopupBox', 'popupMinHei'].join(' ')}>
                            <InputLabel htmlFor="name-input" className={'textForLabelPopup'}>
                                <Fragment>
                                    {inputHeader}&nbsp;
                                    {primaryheader ? (
                                        <>
                                            <span className={'headerBadge'}>{primaryheader}</span>&nbsp;
                                        </>
                                    ) : null}
                                    {primaryheaderTwo ? (
                                        <span className={'headerBadge'}>{primaryheaderTwo}</span>
                                    ) : null}
                                </Fragment>
                            </InputLabel>
                            <div className={'infoSymbol'}></div>
                            <div className={'infoSymbol'}>
                                <InfoToolTip message="Click me, I will stay visible until you click outside." />
                            </div>
                        </div>
                    </div>
                    <FormControl style={{ width: '100%' }}>
                        <SelectField
                            tag={'item_Aligement'}
                            name={'item_Aligement'}
                            label={'item'}
                            dataValue={'item'}
                            labelBadgeOne={'alignment'}
                            
                            listSelect={[
                                { id: 'horizontal-bottom', name: 'horizontal-bottom' },
                                { id: 'horizontal-top', name: 'horizontal-top' },
                                { id: 'vertical-bottom', name: 'vertical-bottom' },
                                { id: 'vertical-top', name: 'vertical-top' }
                            ]}
                            errorMsg={() => { }}
                            value={''}
                            mappingValue={'id'}
                        />
                        <SelectField
                            tag={'item_Type'}
                            label={'item'}
                            name={'item_Type'}
                            dataValue={'item'}
                            labelBadgeOne={'type'}
                            errorMsg={() => { }}
                            
                            mappingValue={'id'}
                        />
                        <SelectField
                            tag={'response_Aligement'}
                            label={'response'}
                            dataValue={'response'}
                            name={'response_Aligement'}
                            labelBadgeOne={'alignment'}
                            listSelect={[
                                { id: 'horizontal-bottom', name: 'horizontal-bottom' },
                                { id: 'horizontal-top', name: 'horizontal-top' },
                                { id: 'vertical-bottom', name: 'vertical-bottom' },
                                { id: 'vertical-top', name: 'vertical-top' }
                            ]}
                            errorMsg={() => { }}
                            
                           
                            mappingValue={'id'}
                        />
                        <div className={'fitContent'}>
                            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                                <div className={'contFlex'}>
                                    <div
                                        className={'f4'}
                                    >
                                        {createNameWithBadge('item (explanation)')}
                                    </div>
                                    <div className={'checkedFontNew'}>
                                        <Checkbox
                                            className={''}
                                            color="default"
                                            name={'assesseeAddressEmailCommunication'}
                                            value={''}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'fitContent'}>
                            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                                <div className={'contFlex'}>
                                    <div
                                        className={'f4'}
                                    >
                                        {createNameWithBadge('item (label)')}
                                    </div>
                                    <div className={'checkedFontNew'}>
                                        <Checkbox
                                            className={''}
                                            color="default"
                                            name={'assesseeAddressEmailCommunication'}
                                            value={''}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'fitContent'}>
                            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                                <div className={'contFlex'}>
                                    <div
                                        className={'f4'}
                                    >
                                        {createNameWithBadge('response (choice) (explanation)')}
                                    </div>
                                    <div className={'checkedFontNew'}>
                                        <Checkbox
                                            className={''}
                                            color="default"
                                            name={'assesseeAddressEmailCommunication'}
                                            value={''}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'fitContent'}>
                            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                                <div className={'contFlex'}>
                                    <div
                                        className={'f4'}
                                    >
                                        {createNameWithBadge('response (explanation)')}
                                    </div>
                                    <div className={'checkedFontNew'}>
                                        <Checkbox
                                            className={''}
                                            color="default"
                                            name={'assesseeAddressEmailCommunication'}
                                            value={''}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'fitContent'}>
                            <div className={['PopupFormBox', 'popupMinHei0'].join(' ')} style={{ minHeight: 0 }}>
                                <div className={'contFlex'}>
                                    <div
                                        className={'f4'}
                                    >
                                        {createNameWithBadge('response (label)')}
                                    </div>
                                    <div className={'checkedFontNew'}>
                                        <Checkbox
                                            className={''}
                                            color="default"
                                            name={'assesseeAddressEmailCommunication'}
                                            value={''}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FormControl>
                </DialogContent>
            </Popup>
        </div>
    );
};

export default PopUpItemConfig;
