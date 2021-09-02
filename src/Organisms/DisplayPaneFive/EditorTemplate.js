import React, { useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactHTMLParser from 'react-html-parser';

const EditorTemplate = (props) => {
  const dispatch = useDispatch();
  const { itemInformation } = useSelector((state) => state.ItemCreateReducer);
  const { isPopUpValue, popupMode } = useSelector((state) => state.PopUpReducer);
  const itemFrameworkOneResponseChoice =
    itemInformation?.informationFramework?.itemFrameworkOne?.itemFrameworkOneResponseChoice || [];
  const itemFrameworkOne = itemInformation?.informationFramework?.itemFrameworkOne;
  const { jsonData, label } = props;
  console.log('jsonData', jsonData);
  console.log('label', label);
  return (
    <>
      {jsonData?.blocks &&
        jsonData?.blocks.map((dd, index) => {
          return (
            <div>
              {dd.type === 'paragraph' && <p id={dd.id}>{ReactHTMLParser(dd.data.text)}</p>}
              {dd.type === 'image' && (
                <Fragment>
                  <img id={dd.id} src={dd.data.file.url} alt={'img'} />
                  <div>{dd.data.caption}</div>
                </Fragment>
              )}
            </div>
          );
        })}
    </>
  );
};

export default EditorTemplate;
