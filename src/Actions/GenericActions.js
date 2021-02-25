export const setAssesseeCardPermissionInJson = (popupValuArr, assesseePermission) => {
  let popupContentArrValue = popupValuArr.map(function (el) {
    var o = Object.assign({}, el);
    var sss = el.permissionArr;
    o.disabled =
      assesseePermission && assesseePermission[sss]
        ? !assesseePermission[sss].includes(el.permission)
        : true;
    return o;
  });
  return popupContentArrValue;
};
export const setAssociateCardPermissionInJson = (popupValuArr, assesseePermission) => {
  var isDisabled = true;
  console.log(assesseePermission);

  let popupContentArrValue = popupValuArr.map(function (el) {
    var o = Object.assign({}, el);
    var sss = el.permissionArr;
    if (assesseePermission.associateHierarchy.includes('review')){
      isDisabled = assesseePermission && assesseePermission[sss]
      ? !assesseePermission[sss].includes(el.permission)
      : true;
    }
    o.disabled = isDisabled;
    return o;
  });
  return popupContentArrValue;
};
