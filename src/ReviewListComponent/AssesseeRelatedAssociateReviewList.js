import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GET_ASSESSEE_INFO_SAGA,
  GET_SIGNED_ASSESEE_NOTIFICATION,
  LOADER_START,
  SET_MIDDLEPANE_STATE,
  SET_MOBILE_PANE_STATE,
  SET_SELECTED_ASSOCIATE
} from '../actionType';
import { GET_SIGNED_ASSESSEE_PERMISSION_SAGA } from '../actionType';
import ReviewList from '../Molecules/ReviewList/ReviewList';

const AssesseeRelatedAssociateReviewList = (props) => {
  const { userData } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const onClickReviewList = (e) => {
    let selectedAssessee = e.currentTarget.getAttribute('data-value');
    let selectedAssociate = userData.filter(function (data) {
      return data.assesseeId === selectedAssessee;
    });
    let selectedAsso = selectedAssociate[0];
    console.log('selectedAsso', selectedAsso);
    dispatch({ type: LOADER_START });
    dispatch({
      type: SET_SELECTED_ASSOCIATE,
      payload: selectedAsso
    });
    localStorage.setItem(
      'parentId',
      selectedAsso?.associate?.informationFramework?.associateAscendantPrimary || null
    );
    dispatch({
      type: GET_ASSESSEE_INFO_SAGA,
      payload: {
        secondaryOptionCheckValue: 'all',
        headerOne: '',
        setLeftPaneAssessee: true,
        reqBody: {
          assesseeId: selectedAsso?.assesseeId,
          associateId:
            selectedAsso.associate.informationEngagement.associateTag.associateTagPrimary,
          filter: 'true',
          searchCondition: 'AND',
          search: [
            {
              condition: 'and',
              searchBy: [
                {
                  dataType: 'string',
                  conditionColumn: 'id',
                  conditionValue: {
                    condition: 'eq',
                    value: {
                      from: selectedAsso.assesseeId
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    });
    dispatch({ type: SET_MOBILE_PANE_STATE, payload: 'displayPaneOne' });
    // dispatch({
    //   type: GET_SIGNED_ASSESEE_NOTIFICATION,
    //   payload: {
    //     reqBody: {
    //       assesseeId: selectedAsso?.assesseeId,
    //       associateId: selectedAsso.associate.informationEngagement.associateTag.associateTagPrimary
    //     }
    //   }
    // });
    // dispatch({ type: GET_SIGNED_ASSESSEE_PERMISSION_SAGA });
    dispatch({
      type: SET_MIDDLEPANE_STATE,
      payload: {
        middlePaneHeader: '',
        middlePaneHeaderBadgeOne: '',
        middlePaneHeaderBadgeTwo: '',
        middlePaneHeaderBadgeThree: '',
        middlePaneHeaderBadgeFour: '',
        typeOfMiddlePaneList: '',
        scanCount: null,
        showMiddlePaneState: false
      }
    });
  };
  return (
    <>
      {userData &&
        userData.map((item, index) => {
          return (
            <div className="containerPadding" key={index}>
              <ReviewList
                className=""
                id={index}
                dataValue={item.assesseeId}
                tag={item.associate.informationEngagement.associateTag.associateTagPrimary}
                status={item.associate.informationEngagement.associateStatus}
                textOne={item.associate.informationBasic.associateName}
                textTwo={item.associate.informationBasic.associateDescription}
                isTooltipActive={false}
                onClickEvent={onClickReviewList}
              />
            </div>
          );
        })}
    </>
  );
};
export default AssesseeRelatedAssociateReviewList;
