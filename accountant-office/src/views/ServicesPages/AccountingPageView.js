import React, { useState } from 'react';
import './Services.css';

import { NavLink } from 'react-router-dom';

export default function AccountingPageView({
  setSwitchChecked,
  setOfferButtonOn,
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
  return (
    <>
      <div className='accounting-container'>
        <div className={switchChecked ? 'accounting-box-bright' : 'accounting-box-dark'}>
          <h1>Komplett számviteli szolgáltatás</h1>
          <span>
            Ügyfeleink számára komplett számviteli szolgáltatást nyújtunk, mely
            tartalmazza az egyéni és társas vállalkozások részére a teljeskörű főkönyvi és
            analitikus nyilvántartások naprakész vezetését. Tevékenységfüggő bevallásainak
            határidőre való elkészítését és beküldését. Ügyfeleink igényeinek megfelelően
            adatszolgáltatás részükre, éves beszámolóinak összeállítása, illetve szükség
            esetén könyvvizsgálóval való együttműködés.
          </span>
          <div className='button-container'>
            <NavLink to='/'>
              <button onClick={setOfferButtonOn}>Árajánlat</button>
            </NavLink>
          </div>
        </div>
        <div className={switchChecked ? 'tax-box-bright' : 'tax-box-dark'}>
          <h1>Bérszámfejtés</h1>
          <span>
            Bérszámfejtési szolgáltatást is végzünk partnereink számára, amely a
            teljeskörű havi és hóközi bérszámfejtés elkészítését, munkavállalók be - és
            kijelentését jelenti. Ehhez kapcsolódóan a járulékbevallás határidőre való
            elkészítése és beküldése. Ide tartozik még a különböző munkaügyi feladatok
            ellátása és szükség szerint KSH adatszolgáltatás. Ezen kívül igény szerint
            éves SZJA bevallások elkészítése és benyújtása.
          </span>
          <div className='button-container'>
            <NavLink to='/'>
              <button onClick={setOfferButtonOn}>Árajánlat</button>
            </NavLink>
          </div>
        </div>
        <div className={switchChecked ? 'salary-box-bright' : 'salary-box-dark'}>
          <h1>Cégalapítás/Vállalkozás indítás</h1>
          <span>
            Leendő partnereink részére elvégezzük az induló vállalkozásaikhoz szükséges
            kötelező bejelentéseket és adatszolgáltatásokat. Ez mellett több éve meglévő
            jogi kapcsolataink révén segítünk a cégalapításban.
          </span>
          <div className='button-container'>
            <NavLink to='/'>
              <button onClick={setOfferButtonOn}>Árajánlat</button>
            </NavLink>
          </div>
        </div>
        <div
          className={
            switchChecked ? 'annual-report-box-bright' : 'annual-report-box-dark'
          }
        >
          <h1>Üzletviteli tanácsadás</h1>

          <span>
            Több éves tapasztalataink alapján a gazdasági környezetet, az adózási
            formákat, és a tevékenység jellegét figyelembe véve segítünk kiválasztani a
            megfelelő vállalkozási formát. Felmérjük a tevékenység gazdasági kockázatait
            és rávilágítunk a lehetséges nehézségekre. Javaslatot teszünk a jelenlegi és
            leendő partnereink részére a számukra legoptimálisabb adózási módra.
          </span>
          <div className='button-container'>
            <NavLink to='/'>
              <button onClick={setOfferButtonOn}>Árajánlat</button>
            </NavLink>
          </div>
        </div>
        {/* <div
          className={
            switchChecked ? 'annual-report-box-bright' : 'annual-report-box-dark'
          }
        >
          <h1>Bevallás készítés</h1>
          <span>
            Lórum ipse egy gyönyökő retlőség a túl kevés és a túl sok között. Rond tányos
            fásos pornímágot fekülő, a fekülő által közvetlenül fátlan ködésök ángása után
            ciánghat. Ehhez fekülőnek természetesen csilnie kell az égszerítő kulldort is.
            Rond rond a kölyökök és pornímágok a fita nem viszmoskodják. Az égszerítő
            vostához való üléshöz, ámor magmuskájában, vagy mokánán bódik egy ságó
            kegyeletést.
          </span>
          <div className='button-container'>
            <NavLink to='/'>
              <button onClick={setOfferButtonOn}>Árajánlat</button>
            </NavLink>
          </div>
        </div>*/}
        <div
          className={
            switchChecked ? 'web-developement-box-bright' : 'web-developement-box-dark'
          }
        >
          <h1>Web-fejlesztés</h1>
          <span>
            Cégünk egyedi web-oldal készítéssel is foglalkozik. A legkorszerűbb
            technológiákat és program nyelveket alkalmazva, úgy mint: JavaScript, React,
            HTML, CSS, JIRA, Git, Firebase stb. A legfejlettebb techonlógiai stack-et
            alkalmazva lehetőségünk van full-respopnsive, igényes megjelenésű
            web-oldalakat készíteni. Az oldalakat igény esetén egyedi funkciókkal is
            felvértezzük, mely így vállalati környezetben is képes megállni a helyét. Ha
            kérdése, van keressen meg Minket, vagy kérjen árajánlatot!
          </span>
          <div className='button-container'>
            <NavLink to='/'>
              <button onClick={setOfferButtonOn}>Árajánlat</button>
            </NavLink>
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
