import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import ScrollToTop from '../../others/ScrollToTop';

export default function ActualitiesCard({ actualitiesObj, switchChecked }) {
  const key = actualitiesObj[0];
  const [articleOpen, setArticleOpen] = useState(false);
  const cardClickHandler = (e) => {
    if (articleOpen) {
      setArticleOpen(false);
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      setArticleOpen(true);
    }
  };
  const articleCloser = (e) => {
    setArticleOpen(false);
  };
  return (
    <div>
      {articleOpen && (
        <>
          <div onClick={articleCloser} className='article-open-background'></div>
          <div
            className={
              switchChecked
                ? 'article-open-container-bright'
                : 'article-open-container-dark'
            }
          >
            <button onClick={articleCloser}>
              <FontAwesomeIcon id='x-icon' icon={faSquareXmark} />
            </button>
            <div className='article-image-container'>
              <img
                src={
                  actualitiesObj[1].imageUrl
                    ? actualitiesObj[1]?.imageUrl
                    : 'https://firebasestorage.googleapis.com/v0/b/accountant-office.appspot.com/o/actualities%2Fcalculator.jpg?alt=media&token=ebc319b2-dc41-4f44-b4c3-36827a06fe35'
                }
              ></img>
            </div>
            <div className='article-content-container'>
              <div className='article-head-date'>
                <h1 className='article-header'>{actualitiesObj[1]?.header}</h1>
                <span className='article-date'>{actualitiesObj[1]?.date}</span>
              </div>

              <span className='article-preface'>{actualitiesObj[1]?.content}</span>
              <h2 className='article-paragraph-header'>{actualitiesObj[1]?.header2}</h2>
              <span className='article-preface'>{actualitiesObj[1]?.content2}</span>
              <h2 className='article-paragraph-header'>{actualitiesObj[1]?.header3}</h2>
              <span className='article-preface'>{actualitiesObj[1]?.content3}</span>
              <h2 className='article-paragraph-header'>{actualitiesObj[1]?.header4}</h2>
              <span className='article-preface'>{actualitiesObj[1]?.content4}</span>
            </div>
          </div>
        </>
      )}

      <div
        onClick={cardClickHandler}
        className={switchChecked ? 'actualities-card-bright' : 'actualities-card-dark'}
        key={`actualitiesCard/${key}`}
      >
        <div className='actualities-image-container'>
          <img
            src={
              actualitiesObj[1].imageUrl
                ? actualitiesObj[1]?.imageUrl
                : 'https://firebasestorage.googleapis.com/v0/b/accountant-office.appspot.com/o/actualities%2Fcalculator-385506.jpg?alt=media&token=ebc319b2-dc41-4f44-b4c3-36827a06fe35'
            }
          ></img>
        </div>
        <h1>{actualitiesObj[1]?.header}</h1>

        <span>{actualitiesObj[1]?.content}</span>
      </div>
    </div>
  );
}
