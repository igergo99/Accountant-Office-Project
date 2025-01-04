import React, { useEffect, useState } from 'react';
import { readData } from '../../services/crud';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, auth } from '../../config/firebase';
import { updateData } from '../../services/crud';
import { DataSnapshot, set } from '@firebase/database';

export default function EditForm({
  backButtonHandler,
  setFeedBackMessage,
  editWindowCloser,
  endpointKey,
  isLogged,
}) {
  const [inputArea2, setInputArea2] = useState(null);
  const [inputArea3, setInputArea3] = useState(null);
  const [inputArea4, setInputArea4] = useState(null);
  const [headerInput2, setHeaderInput2] = useState(null);
  const [headerInput3, setHeaderInput3] = useState(null);
  const [headerInput4, setHeaderInput4] = useState(null);
  const [editObj, setEditObj] = useState(null);
  const [maxInputMessage, setMaxInputMessage] = useState(null);
  const [actualitiesData, setActualitiesData] = useState({ image: null });

  useEffect(() => {
    readData('ActualitiesDataBase', endpointKey)
      .then((DataSnapshot) => {
        setActualitiesData(DataSnapshot.toJSON());
      })

      .catch((e) => {
        console.log(e);
      });
  }, []);

  const changeHandler = (e) => {
    setActualitiesData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const photoChangeHandler = (e) => {
    setActualitiesData({ ...actualitiesData, [e.target.name]: e.target.files[0] });
  };

  const imageUploader = (e) => {
    const fileRef = ref(storage, `actualities/${actualitiesData?.image.name}`);
    uploadBytes(fileRef, actualitiesData?.image)
      .then((uploadResult) => {
        getDownloadURL(uploadResult?.ref)
          .then((value) => {
            setActualitiesData((prev) => ({ ...prev, imageUrl: value }));
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  const plusClickHandler = (e) => {
    if (!headerInput2) {
      setHeaderInput2(
        React.createElement('input', {
          placeholder: 'Első bekezdés címe:',

          name: 'header2',
          onChange: changeHandler,
        })
      );
      setInputArea2(
        React.createElement('textarea', {
          placeholder: 'Első bekezdés szövege:',

          name: `content2`,
          onChange: changeHandler,
        })
      );
    } else if (headerInput2 && !headerInput3) {
      setInputArea3(
        React.createElement('textarea', {
          placeholder: 'Második bekezdés szövege:',
          name: `content3`,
          onChange: changeHandler,
        })
      );
      setHeaderInput3(
        React.createElement('input', {
          placeholder: 'Harmadik bekezdés címe:',
          name: 'header3',
          onChange: changeHandler,
        })
      );
    } else if (headerInput3 && !headerInput4) {
      setInputArea4(
        React.createElement('textarea', {
          placeholder: 'Harmadik bekezdés szövege:',
          name: `content4`,
          onChange: changeHandler,
        })
      );
      setHeaderInput4(
        React.createElement('input', {
          placeholder: 'Harmadik bekezdés címe:',
          name: 'header4',
          onChange: changeHandler,
        })
      );
    } else {
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
    if (auth.currentUser) {
      updateData(`ActualitiesDataBase`, endpointKey, actualitiesData)
        .then(() => {
          console.log(actualitiesData);
        })
        .then(() => {
          editWindowCloser();
          setFeedBackMessage('Sikeres módosítás!');
          backButtonHandler();
          setTimeout(() => {
            setFeedBackMessage(null);
          }, 4000);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log('nem sikerült a feltöltés');
    }
  };
  return (
    <>
      {isLogged && (
        <div className='edit-form-container'>
          <form className='actualities-form-container' onSubmit={submitHandler}>
            <label htmlFor='headerInput'>Cím: </label>
            <input
              defaultValue={actualitiesData?.header}
              onChange={changeHandler}
              name='header'
              id='headerInput'
            />
            {/* <label htmlFor='imageInput'>Kép: </label>
        <input type='file' onChange={photoChangeHandler} name='image' id='imageInput' />
        <button type='button' onClick={imageUploader}>
          Kép feltöltése
        </button> */}
            <label htmlFor='contentInput'>Bevezetés: </label>
            <textarea
              defaultValue={actualitiesData?.content}
              onChange={changeHandler}
              name='content'
              id='contentInput'
            />

            {headerInput2}

            {inputArea2}

            {headerInput3}

            {inputArea3}

            {headerInput4}

            {inputArea4}

            {maxInputMessage ? maxInputMessage : null}
            <div className='form-button-container'>
              <button type='submit'>Feltöltés</button>
              <button onClick={plusClickHandler} type='button'>
                +
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
