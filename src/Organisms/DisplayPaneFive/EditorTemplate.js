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
  function checkExtension(file) {
    var extension = file.substr(file.lastIndexOf('.') + 1);
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'image';
      case 'mp4':
      case 'mp3':
      case 'ogg':
        return 'video';
      default:
        return -1;
    }
  }
  console.log('jsonData',jsonData);
  return (
    <>
      {jsonData?.blocks &&
        jsonData?.blocks.map((dd, index) => {
          return (
            <div>
              {dd.type === 'paragraph' && <p id={dd.id}>{ReactHTMLParser(dd.data.text)}</p>}
              {dd.type === 'embed' && (
                <iframe title={dd.id} width="420" height="315" src={dd.data.embed}></iframe>
              )}
              {dd.type === 'image' && (
                <Fragment>
                  {checkExtension(dd.data.file.url) === 'image' && dd.type === 'image' && (
                    <Fragment>
                      <img id={dd.id} src={dd.data.file.url} alt={'img'} />
                      <div>{dd.data.caption}</div>
                    </Fragment>
                  )}
                  {checkExtension(dd.data.file.url) === 'video' && dd.type === 'image' && (
                    <Fragment>
                      <video width="320" height="240" controls>
                        <source src={dd.data.file.url} type="video/mp4" />
                      </video>
                    </Fragment>
                  )}
                </Fragment>
              )}

              {dd.type === 'audio' && (
                <audio controls>
                  <source src={dd.data.url} type="audio/mpeg" />
                </audio>
              )}
            </div>
          );
        })}
    </>
  );
};

export default EditorTemplate;
