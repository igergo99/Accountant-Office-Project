import React, { useState, useEffect, useLayoutEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { auth, storage } from '../config/firebase';
import { createNewData, deleteData, readData } from '../services/crud';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './ActualitiesForm.css';
import { signOut } from '@firebase/auth';
import NotFound from '../components/NotFound/NotFound';
import {
  faFileCirclePlus,
  faFilePen,
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faCircleLeft,
  faSquareXmark,
} from '@fortawesome/free-solid-svg-icons';
import ActualitiesCard from '../components/ActualitiesCard/ActualitiesCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditForm from '../components/EditForm/EditForm';

export default function ActualititesFormView({
  actualitiesArray,
  isLogged,
  perPage,
  toDefault,
  setToDefault,
  setIsLogged,
  switchChecked,
}) {
  const navigateTo = useNavigate();

  const itemsPerPage = perPage;

  const [currentPage, setCurrentPage] = useState(1);
  const [fromIndex, setfromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(itemsPerPage);
  const [dataArray, setDataArray] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [feedBackMessage, setFeedBackMessage] = useState(null);
  const [itemsToRender, setItemsToRender] = useState([]);
  const [formChoser, setFormChoser] = useState(null);
  const [actualitiesData, setActualitiesData] = useState({});
  const [inputArea2, setInputArea2] = useState(null);
  const [inputArea3, setInputArea3] = useState(null);
  const [inputArea4, setInputArea4] = useState(null);
  const [headerInput2, setHeaderInput2] = useState(null);
  const [headerInput3, setHeaderInput3] = useState(null);
  const [headerInput4, setHeaderInput4] = useState(null);
  const [maxInputMessage, setMaxInputMessage] = useState(null);
  const [endpointKey, setEndpointKey] = useState(null);
  const [editWindowOpen, setEditWindowOpen] = useState(null);
  const [deleteWindowOpen, setDeleteWindowOpen] = useState(null);
  const [formChoserOpen, setFormChoserOpen] = useState(true);
  const pageNumber = Math.ceil(totalItems / itemsPerPage);

  const [uploadButtonDisabled, setUpldoadButtonDisabled] = useState(true);
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  useEffect(() => {
    /* setDataArray(actualitiesArray); */
    const actualitiesDb = readData('ActualitiesDataBase')
      .then((DataSnapshot) => {
        const rawData = DataSnapshot.toJSON();
        setDataArray(Object.entries(rawData).reverse());
      })
      .then(() => {
        setTotalItems(dataArray.length);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [switchChecked, formChoser]);
  useEffect(() => {
    if (toDefault) {
      setCurrentPage(1);
      setfromIndex(0);
      setToIndex(itemsPerPage);
    }
  }, [toDefault, itemsPerPage]);

  const nextButtonHandler = () => {
    setCurrentPage(currentPage + 1);
    setfromIndex(fromIndex + itemsPerPage);
    setToIndex(toIndex + itemsPerPage);

    setItemsToRender(dataArray.reverse().slice(fromIndex, toIndex));
  };

  const previousButtonHandler = () => {
    setCurrentPage(currentPage - 1);
    setfromIndex(fromIndex - itemsPerPage);
    setToIndex(toIndex - itemsPerPage);

    setItemsToRender(dataArray.slice(fromIndex, toIndex));
  };

  const toFirstPageHandler = () => {
    setCurrentPage(1);
    setfromIndex(0);
    setToIndex(itemsPerPage);

    setItemsToRender(dataArray.slice(fromIndex, toIndex));
  };

  const toLastPageHandler = () => {
    setCurrentPage(pageNumber);
    setfromIndex(totalItems - (totalItems % itemsPerPage));
    setToIndex(totalItems);

    setItemsToRender(dataArray.slice(fromIndex, toIndex));
  };

  useEffect(() => {
    setItemsToRender(dataArray.slice(fromIndex, toIndex));
    setToDefault(false);
  }, [dataArray, fromIndex, toIndex, setToDefault]);

  const changeHandler = (e) => {
    if (actualitiesData?.header && actualitiesData?.content) {
      setUpldoadButtonDisabled(false);
    }
    setActualitiesData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(actualitiesData);
  };

  const photoChangeHandler = (e) => {
    setActualitiesData({ ...actualitiesData, [e.target.name]: e.target.files[0] });
    console.log(actualitiesData);
  };

  const imageUploader = (e) => {
    const fileRef = ref(storage, `actualities/${actualitiesData?.image.name}`);
    uploadBytes(fileRef, actualitiesData?.image)
      .then((uploadResult) => {
        getDownloadURL(uploadResult?.ref)
          .then((value) => {
            setActualitiesData((prev) => ({ ...prev, imageUrl: value }));
            setUpldoadButtonDisabled(false);
          })
          .then(() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
            setFeedBackMessage('Sikeres fotó feltöltés!');
            setTimeout(() => {
              setFeedBackMessage(null);
            }, 4000);
          })

          .catch((e) => {
            setFeedBackMessage('Sikertelen fotó feltöltés!');
            setTimeout(() => {
              setFeedBackMessage(null);
            }, 4000);
            console.log(e);
          });
      })
      .catch((e) => console.log(e));
  };

  const plusClickHandler = (e) => {
    if (!inputArea2) {
      setHeaderInput2(
        React.createElement('input', {
          name: 'header2',
          onChange: changeHandler,
        })
      );
      setInputArea2(
        React.createElement('textarea', {
          name: `content2`,
          onChange: changeHandler,
        })
      );
    }
    if (inputArea2 && !inputArea3) {
      setInputArea3(
        React.createElement('textarea', {
          name: `content3`,
          onChange: changeHandler,
        })
      );
      setHeaderInput3(
        React.createElement('input', {
          name: 'header3',
          onChange: changeHandler,
        })
      );
    }
    if (inputArea3 && !inputArea4) {
      setInputArea4(
        React.createElement('textarea', {
          name: `content4`,
          onChange: changeHandler,
        })
      );
      setHeaderInput4(
        React.createElement('input', {
          name: 'header4',
          onChange: changeHandler,
        })
      );
    }
    if (inputArea4) {
      setMaxInputMessage(
        React.createElement(
          'h1',
          { className: 'max-input-message' },
          'Elérted a maximális inputmező számot!'
        )
      );
      setTimeout(() => {
        setMaxInputMessage(null);
      }, 4000);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const actualitieDate = new Date();
    if (auth && actualitiesData?.header && actualitiesData?.content) {
      createNewData('ActualitiesDataBase', {
        ...actualitiesData,
        date: `${actualitieDate.getFullYear()}.${
          actualitieDate.getMonth() + 1
        }.${actualitieDate.getDate()} ${actualitieDate.getHours()}:${actualitieDate.getMinutes()}`,
      })
        .then(() => {
          if (actualitiesData !== {}) {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
            setFeedBackMessage('Sikeres cikk feltöltés!');
            setTimeout(() => {
              setFeedBackMessage(null);
            }, 4000);
            backButtonHandler();
          }
        })
        .then(() => {
          setActualitiesData({});
        })
        .catch((e) => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setFeedBackMessage('Sikertelen cikk feltöltés!');
          setTimeout(() => {
            setFeedBackMessage(null);
          }, 4000);
          console.log(e);
        });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      setFeedBackMessage(
        'Nem sikerült a cikk feltöltés! Kérjük töltsön ki minden szükséges mezőt!'
      );
      setTimeout(() => {
        setFeedBackMessage(null);
      }, 4000);
      console.log('Nem sikerült a cikk feltöltés!');
    }
  };
  const backButtonHandler = (e) => {
    setFormChoser(0);
    setFormChoserOpen(true);
    setDeleteWindowOpen(false);
    setEditWindowOpen(false);
  };
  const formChoseClickHandler1 = (e) => {
    setFormChoser(1);
    setFormChoserOpen(false);
  };
  const formChoseClickHandler2 = (e) => {
    setFormChoser(2);
    setFormChoserOpen(false);
  };
  const editButtonHandler = (e) => {
    setEndpointKey(e.target.name);
    setEditWindowOpen(true);
  };
  const editWindowCloser = (e) => {
    setEditWindowOpen(false);
  };
  const deleteButtonHandler = (e) => {
    setEndpointKey(e.target.name);

    setDeleteWindowOpen(true);
  };
  const deleteFromDataBase = (e) => {
    deleteData('ActualitiesDataBase', endpointKey)
      .then(() => {
        setDeleteWindowOpen(false);
      })
      .then(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        setFeedBackMessage('Sikeres törlés!');
        setTimeout(() => {
          setFeedBackMessage(null);
        }, 4000);
        backButtonHandler();
      })
      .catch((e) => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        setFeedBackMessage('Sikertelen törlés!');
        setTimeout(() => {
          setFeedBackMessage(null);
        }, 4000);
        console.log(e);
      });
  };
  const cancelHandler = (e) => {
    setDeleteWindowOpen(false);
  };

  const signOutClickHandler = (e) => {
    e.preventDefault();
    signOut(auth)
      .then((authCredential) => {
        setIsLogged(false);
        navigateTo('/');
      })
      .then(() => {
        console.log(auth.currentUser);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (isLogged) {
    return (
      <>
        {formChoserOpen && (
          <div className='choose-form-container'>
            <div className='choose-form-header'>
              {feedBackMessage && <h1>{feedBackMessage}</h1>}
              <h1>Válassz az alábbi két opció közül:</h1>
            </div>

            <div className='new-article-center'>
              <div className='new-article-container' onClick={formChoseClickHandler1}>
                <FontAwesomeIcon name='1' icon={faFileCirclePlus} />
                <h1>Új cikk létrehozása</h1>
              </div>
            </div>
            <div className='article-editer-center'>
              <div className='article-editer-container' onClick={formChoseClickHandler2}>
                <FontAwesomeIcon name='2' icon={faFilePen} />
                <h1>Meglévő cikk szerkesztése</h1>
              </div>
            </div>
          </div>
        )}

        {formChoser === 1 && (
          <>
            <div className='back-button'>
              <FontAwesomeIcon onClick={backButtonHandler} icon={faCircleLeft} />
            </div>
            <div className='new-actualities-container'>
              <div>
                <form className='actualities-form-container' onSubmit={submitHandler}>
                  {feedBackMessage && <h1>{feedBackMessage}</h1>}
                  <label htmlFor='headerInput'>Cím: </label>
                  <input onChange={changeHandler} name='header' id='headerInput' />
                  <label htmlFor='imageInput'>Kép: </label>
                  <input
                    type='file'
                    onChange={photoChangeHandler}
                    name='image'
                    id='imageInput'
                  />
                  <div className='form-button-container'>
                    <button type='button' onClick={imageUploader}>
                      Kép feltöltése
                    </button>
                  </div>
                  <label htmlFor='contentInput'>Bevezetés: </label>
                  <textarea onChange={changeHandler} name='content' id='contentInput' />
                  {headerInput2 ? <label>Első bekezdés címe: </label> : null}
                  {headerInput2 ? headerInput2 : null}
                  {inputArea2 ? <label>Első bekezdés szövege: </label> : null}
                  {inputArea2 ? inputArea2 : null}
                  {headerInput3 ? <label>Második bekezdés címe: </label> : null}
                  {headerInput3 ? headerInput3 : null}
                  {inputArea3 ? <label>Második bekezdés szövege: </label> : null}
                  {inputArea3 ? inputArea3 : null}
                  {headerInput4 ? <label>Harmadik bekezdés címe: </label> : null}
                  {headerInput4 ? headerInput4 : null}
                  {inputArea4 ? <label>Harmadik bekezdés szövege: </label> : null}
                  {inputArea4 ? inputArea4 : null}

                  {maxInputMessage ? maxInputMessage : null}
                  <div className='form-button-container'>
                    <button onClick={plusClickHandler} type='button'>
                      +
                    </button>
                  </div>
                  <div className='form-button-container'>
                    <button
                      /* disabled={uploadButtonDisabled ? 'disabled' : ''} */
                      type='submit'
                    >
                      Feltöltés
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
        {formChoser === 2 && (
          <>
            <div className='back-button-edit'>
              <FontAwesomeIcon onClick={backButtonHandler} icon={faCircleLeft} />
            </div>
            <div className='actualities-edit-container'>
              {feedBackMessage && <h1>{feedBackMessage}</h1>}
              <div className='actualities-card-container'>
                {itemsToRender.map((actualitiesObj, index) => {
                  return (
                    <div key={index} className='card-with-buttons'>
                      <ActualitiesCard actualitiesObj={actualitiesObj} key={index} />
                      <div className='delete-edit-button-container'>
                        <button onClick={editButtonHandler} name={actualitiesObj[0]}>
                          Szerkesztés
                        </button>
                        <button onClick={deleteButtonHandler} name={actualitiesObj[0]}>
                          Törlés
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                onClick={editWindowCloser}
                className={editWindowOpen && 'article-back-container'}
              ></div>
              <div className='actualities-button-container'>
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
          </>
        )}
        {editWindowOpen && (
          <>
            <div className='edit-window-closer'>
              <FontAwesomeIcon onClick={editWindowCloser} icon={faSquareXmark} />
            </div>
            <EditForm
              editWindowCloser={editWindowCloser}
              backButtonHandler={backButtonHandler}
              setFeedBackMessage={setFeedBackMessage}
              endpointKey={endpointKey}
              isLogged={isLogged}
            />
          </>
        )}
        {deleteWindowOpen && (
          <div className='delete-window'>
            <h1>Biztosan törli?</h1>
            <div className='delete-button-container'>
              <button id='delete-from-data' onClick={deleteFromDataBase}>
                Törlés
              </button>
              <button onClick={cancelHandler}>Mégse</button>
            </div>
          </div>
        )}
        <div className='sign-out-button-container'>
          <button type='button' onClick={signOutClickHandler}>
            Sign out!
          </button>
        </div>
      </>
    );
  } else {
    return (
      <div className='not-found-container'>
        <NotFound />
      </div>
    );
  }
}
