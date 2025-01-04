import React from 'react';
import './AboutUs.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function AboutUsView({
  setOfferButtonOn,
  setServicesButtonOn,
  setSwitchChecked,
  switchChecked,
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
  const navigateTo = useNavigate();
  const offerButton = () => {
    setOfferButtonOn(true);
    navigateTo('/');
  };
  const servicesButton = () => {
    setServicesButtonOn(true);
    navigateTo('/services');
  };
  return (
    <>
      <div
        className={
          switchChecked ? 'about-us-container-bright' : 'about-us-container-dark'
        }
      >
        <h1 className='about-us-header'>Ismerjen meg minket!</h1>
        <div className='ceo-container'>
          <div
            className={switchChecked ? 'ceo-img-header-bright' : 'ceo-img-header-dark'}
          >
            <img src='https://cdn.szmsz.press/wp-content/uploads/2018/12/kecske.jpg' />
            <h2>Iglódi Zoltán</h2>
            <h2>Ügyvezető</h2>
          </div>
          <div className={switchChecked ? 'ceo-content-bright' : 'ceo-content-dark'}>
            <span>
              A menta szerint főleg a flönbök és a vitmatás szegésén rakodik talfart modás
              a büdvös gatlan csártonok között. „Ha ekehendengés tizálnia lejdíti magát a
              repében és romadásban dalmis forgalomokhoz, miszerint enység dellistája
              feddő, a tenna számára is tetravas ingos meznafikává száráljon, akkor a
              legtöbb bunkában ezeket a bojtos tüdött kodásokat most kell hápotyognia. A
              mentát sallomány szegyelben 35 csárton, köztük a gatlan iftelet, a hízékos
              hari és szolt keres (zsomlás) és a béres szifor, játnoti és bargan keresének
              (gerdra) bunkái színtetették magukat. A csencs szerint nem madt gatlan
              ormány logat készen a busztikus bűző nyiskájára az élethosszig pazáns
              kitásba. Ezt szepkedi többek között a 15 fársos sugas vezető flönbje az ízet
              ményke, az okász és a játnoti maszilok szegésén: - a löverek merzésének nem
              elég haradt a fockózás retője ahhoz, hogy az élethosszig pazáns kitást a
              későbbiekben szelóznia tudja. - a metlen retőt szabárt viákos csisznikákban
              a tágikus sugas omlása várhatóan letlegesekkel fog cudválnia gyeténye során.
            </span>
          </div>
        </div>
        <div className={switchChecked ? 'get-offer-bright' : 'get-offer-dark'}>
          <h2>Kérjen árajánlatot most!</h2>
          <button onClick={offerButton}>Árajánlat</button>
        </div>
        <div className='team-container'>
          <div className={switchChecked ? 'team-content-bright' : 'team-content-dark'}>
            <span>
              A menta szerint főleg a flönbök és a vitmatás szegésén rakodik talfart modás
              a büdvös gatlan csártonok között. „Ha ekehendengés tizálnia lejdíti magát a
              repében és romadásban dalmis forgalomokhoz, miszerint enység dellistája
              feddő, a tenna számára is tetravas ingos meznafikává száráljon, akkor a
              legtöbb bunkában ezeket a bojtos tüdött kodásokat most kell hápotyognia. A
              mentát sallomány szegyelben 35 csárton, köztük a gatlan iftelet, a hízékos
              hari és szolt keres (zsomlás) és a béres szifor, játnoti és bargan keresének
              (gerdra) bunkái színtetették magukat. A csencs szerint nem madt gatlan
              ormány logat készen a busztikus bűző nyiskájára az élethosszig pazáns
              kitásba. Ezt szepkedi többek között a 15 fársos sugas vezető flönbje az ízet
              ményke, az okász és a játnoti maszilok szegésén: - a löverek merzésének nem
              elég haradt a fockózás retője ahhoz, hogy az élethosszig pazáns kitást a
              későbbiekben szelóznia tudja. - a metlen retőt szabárt viákos csisznikákban
              a tágikus sugas omlása várhatóan letlegesekkel fog cudválnia gyeténye során.
            </span>
          </div>
          <div
            className={switchChecked ? 'team-img-header-bright' : 'team-img-header-dark'}
          >
            <img src='https://placekitten.com/200/270' />
            <h2>A csapat</h2>
          </div>
        </div>
        <div className={switchChecked ? 'get-services-bright' : 'get-services-dark'}>
          <button onClick={servicesButton}>Szolgáltatások</button>
          <h2>Tekintse meg szolgáltatásainkat!</h2>
        </div>
      </div>
      <img
        className='homepage-image-container'
        src={switchChecked ? 'july-pass-3042793.jpg' : 'church-1993645.jpg'}
      />
    </>
  );
}
