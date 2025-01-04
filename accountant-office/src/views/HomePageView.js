import React, { useEffect, useState, useLayoutEffect, useLocation } from 'react';
import './homePage.css';
import HomePageForm from '../components/HomePage/HomePageForm';
import {
  faSchoolFlag,
  faPepperHot,
  faPersonDigging,
  faScaleBalanced,
  faPiggyBank,
  faPeopleArrows,
  faCalculator,
  faCheckDouble,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function HomePageView({
  offerButtonOn,
  setOfferButtonOn,
  setSwitchChecked,
  switchChecked,
}) {
  const [renderDate, setRenderDate] = useState(new Date().getHours());
  useLayoutEffect(() => {}, []);
  useEffect(() => {
    if (renderDate >= 19) {
      setSwitchChecked(false);
    }
  }, []);
  useEffect(() => {
    if (offerButtonOn) {
      window.scrollTo({
        top: 1340,
        left: 0,
        behavior: 'smooth',
      });
      setOfferButtonOn(false);
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, []);
  return (
    <div
      className={switchChecked ? 'homepage-container-bright' : 'homepage-container-dark'}
    >
      <div className='welcome-container'>
        <h1 className={switchChecked ? 'welcome-head-bright' : 'welcome-head-dark'}>
          Üdvözöljük az Accountant Office Kft. oldalán!
        </h1>
        <span
          className={switchChecked ? 'welcome-content-bright' : 'welcome-content-dark'}
        >
          Bizalmas ügykezelés, több, mint 30 év tapasztalat, kis - közép és nagyvállalati
          környezetben is!
        </span>
        <div className='homepage-card-container'>
          <div
            className={switchChecked ? 'homepage-card1-bright' : 'homepage-card1-dark'}
          >
            <div className='homepage-article-even'>
              <h1>Számviteli szolgáltatás mikro, kis - és középvállalkozásoknak</h1>
              <span>
                ● Egyéni és társas vállalkozása részére főkönyvi és analitikus
                nyilvántartások naprakész vezetése ● bevallásainak határidőre való
                elkészítése ● éves beszámolók összeállítása ● szükség esetén
                könyvvizsgálóval való együttműködés
              </span>
            </div>
            <FontAwesomeIcon className='homepage-icons' icon={faScaleBalanced} />
          </div>
          <div
            className={switchChecked ? 'homepage-card2-bright' : 'homepage-card2-dark'}
          >
            <FontAwesomeIcon className='homepage-icons' icon={faPiggyBank} />
            <div className='homepage-article-odd'>
              <h1>Bérszámfejtés</h1>
              <span>
                ● Teljeskörű havi és hóközi bérszámfejtés elkészítése ● munkavállalók be -
                és kijelentése ● járulékbevallás határidőre való elkészítése ● éves SZJA
                bevallások benyújtása ● munkaügyi feladatok ellátása ● KSH
                adatszolgáltatás
              </span>
            </div>
          </div>
          <div
            className={switchChecked ? 'homepage-card3-bright' : 'homepage-card3-dark'}
          >
            <div className='homepage-article-even'>
              <h1>Vállalkozás indítás, üzletviteli tanácsadás</h1>
              <span>
                Segítünk vállalkozásának elindításában ● felmérjük vállalkozása
                életképességét ● a megfelelő vállalkozási formára javaslatot teszünk ●
                különböző gazdasági problémáira megoldást kínálunk
              </span>
            </div>
            <FontAwesomeIcon className='homepage-icons' icon={faCalculator} />
          </div>
          <div
            className={switchChecked ? 'homepage-card4-bright' : 'homepage-card4-dark'}
          >
            <FontAwesomeIcon className='homepage-icons' icon={faPeopleArrows} />
            <div className='homepage-article-odd'>
              <h1>Rugalmas rendelkezésre állás</h1>
              <span>
                ● Gazdasági ● munkaügyi ● adózási jellegű problémáinak megoldása
              </span>
            </div>
          </div>
          <div
            className={switchChecked ? 'homepage-card3-bright' : 'homepage-card3-dark'}
          >
            <div className='homepage-article-even'>
              <h1>Tapasztalat</h1>
              <span>
                ● Több, mint 25 éves tapasztalattal rendelkezünk ● széleskörű szakmai
                ismeretek ● törvényi változások folyamatos nyomon követése ●
                továbbképzéseken való részvétel
              </span>
            </div>
            <FontAwesomeIcon className='homepage-icons' icon={faCheckDouble} />
          </div>
        </div>
      </div>
      <HomePageForm switchChecked={switchChecked} />
      <img
        className='homepage-image-container'
        src={switchChecked ? 'july-pass-3042793.jpg' : 'church-1993645.jpg'}
      />
    </div>
  );
}
