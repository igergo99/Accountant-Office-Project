import React, { useEffect, useState } from 'react';
import ActualitiesCard from '../components/ActualitiesCard/ActualitiesCard';
import { readData } from '../services/crud';
import './Actualities.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from '@fortawesome/free-solid-svg-icons';

export default function ActualitiesView({
  actualitiesArray,
  perPage,
  toDefault,
  setToDefault,
  switchChecked,
  setSwitchChecked,
}) {
  const [renderDate, setRenderDate] = useState(new Date().getHours());
  if (renderDate >= 19) {
    setSwitchChecked(false);
  }
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  const itemsPerPage = perPage;

  const [currentPage, setCurrentPage] = useState(1);
  const [fromIndex, setfromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(itemsPerPage);
  const [dataArray, setDataArray] = useState([]);
  const totalItems = dataArray.length;
  const pageNumber = Math.ceil(totalItems / itemsPerPage);
  const [itemsToRender, setItemsToRender] = useState([]);
  const [articleOpen, setArticleOpen] = useState(false);

  useEffect(() => {
    /* setDataArray(actualitiesArray); */

    const actualitiesDb = readData('ActualitiesDataBase')
      .then((DataSnapshot) => {
        const rawData = DataSnapshot.toJSON();
        setDataArray(Object.entries(rawData).reverse());
      })
      .catch((e) => {
        console.log(e);
      });
  }, [switchChecked]);
  useEffect(() => {
    if (toDefault) {
      setCurrentPage(1);
      setfromIndex(0);
      setToIndex(itemsPerPage);
    }
  }, [toDefault, itemsPerPage]);

  const nextButtonHandler = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setCurrentPage(currentPage + 1);
    setfromIndex(fromIndex + itemsPerPage);
    setToIndex(toIndex + itemsPerPage);

    setItemsToRender(dataArray.slice(fromIndex, toIndex));
    console.log('next page');
  };

  const previousButtonHandler = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setCurrentPage(currentPage - 1);
    setfromIndex(fromIndex - itemsPerPage);
    setToIndex(toIndex - itemsPerPage);

    setItemsToRender(dataArray.slice(fromIndex, toIndex));
    console.log('previous page');
  };

  const toFirstPageHandler = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setCurrentPage(1);
    setfromIndex(0);
    setToIndex(itemsPerPage);

    setItemsToRender(dataArray.slice(fromIndex, toIndex));
    console.log('to first page');
  };

  const toLastPageHandler = () => {
    setCurrentPage(pageNumber);
    setfromIndex(totalItems - (totalItems % itemsPerPage));

    setToIndex(totalItems);

    setItemsToRender(dataArray.slice(fromIndex, toIndex));
    console.log('to last page');
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    setItemsToRender(dataArray.slice(fromIndex, toIndex));
    setToDefault(false);
  }, [dataArray, fromIndex, toIndex, setToDefault]);

  return (
    <>
      <div className='actualities-container'>
        <div
          className={
            switchChecked ? 'actualities-header-bright' : 'actualities-header-dark'
          }
        >
          <h1>Legfrissebb híreink</h1>
        </div>
        <div className='actualities-card-container'>
          {itemsToRender.map((actualitiesObj, index) => {
            return (
              <ActualitiesCard
                switchChecked={switchChecked}
                actualitiesObj={actualitiesObj}
                key={index}
              />
            );
          })}
        </div>
        <div className='article-container'></div>
        <div
          className={
            switchChecked
              ? 'actualities-button-container-bright'
              : 'actualities-button-container-dark'
          }
        >
          <div>
            <button
              type='button'
              onClick={toFirstPageHandler}
              disabled={currentPage > 2 ? '' : 'disabled'}
            >
              <FontAwesomeIcon icon={faAnglesLeft} />
            </button>
            <button
              type='button'
              onClick={previousButtonHandler}
              disabled={currentPage === 1 ? 'disabled' : ''}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <span>{` Page ${currentPage} of ${pageNumber} `}</span>
            <button
              type='button'
              onClick={nextButtonHandler}
              disabled={currentPage === pageNumber ? 'disabled' : ''}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <button
              type='button'
              onClick={toLastPageHandler}
              disabled={currentPage < pageNumber - 1 ? '' : 'disabled'}
            >
              <FontAwesomeIcon icon={faAnglesRight} />
            </button>
          </div>
        </div>
      </div>
      <img
        className='homepage-image-container'
        src={switchChecked ? 'july-pass-3042793.jpg' : 'church-1993645.jpg'}
      />
    </>
  );
}
