import React, { useEffect, useState } from 'react';
import './References.css';
export default function ReferencesView({ switchChecked, setSwitchChecked }) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  const [renderDate, setRenderDate] = useState(new Date().getHours());
  if (renderDate >= 19) {
    setSwitchChecked(false);
  }

  const [referenceChoser, setReferenceChoser] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setReferenceChoser(!referenceChoser);
    }, 8000);
  }, [referenceChoser]);
  return (
    <>
      <div className='references-container'>
        <div
          className={
            switchChecked ? 'active-reference-1-bright' : 'active-reference-1-dark'
          }
        >
          <span>
            "The art of war teaches us to rely not on the likelihood of the enemy's not
            coming, but on our own readiness to receive him; not on the chance of his not
            attacking, but rather on the fact that we have made our position
            unassailable."
          </span>
          <div className='company-name-container'>
            <span>-Sun Tzu-</span>
          </div>
        </div>
        <div
          className={
            switchChecked ? 'active-reference-2-bright' : 'active-reference-2-dark'
          }
        >
          <span>
            "The art of war teaches us to rely not on the likelihood of the enemy's not
            coming, but on our own readiness to receive him; not on the chance of his not
            attacking, but rather on the fact that we have made our position
            unassailable."
          </span>
          <div className='company-name-container'>
            <span>-Sun Tzu-</span>
          </div>
        </div>
        <div
          className={
            switchChecked ? 'active-reference-3-bright' : 'active-reference-3-dark'
          }
        >
          <span>
            "The art of war teaches us to rely not on the likelihood of the enemy's not
            coming, but on our own readiness to receive him; not on the chance of his not
            attacking, but rather on the fact that we have made our position
            unassailable."
          </span>
          <div className='company-name-container'>
            <span>-Sun Tzu-</span>
          </div>
        </div>
        <div
          className={
            switchChecked ? 'active-reference-4-bright' : 'active-reference-4-dark'
          }
        >
          <span>
            "The art of war teaches us to rely not on the likelihood of the enemy's not
            coming, but on our own readiness to receive him; not on the chance of his not
            attacking, but rather on the fact that we have made our position
            unassailable."
          </span>
          <div className='company-name-container'>
            <span>-Sun Tzu-</span>
          </div>
        </div>
        <div
          className={
            switchChecked ? 'active-reference-5-bright' : 'active-reference-5-dark'
          }
        >
          <span>
            "The art of war teaches us to rely not on the likelihood of the enemy's not
            coming, but on our own readiness to receive him; not on the chance of his not
            attacking, but rather on the fact that we have made our position
            unassailable."
          </span>
          <div className='company-name-container'>
            <span>-Sun Tzu-</span>
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
