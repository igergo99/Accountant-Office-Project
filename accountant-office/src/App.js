import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePageView from './views/HomePageView';
import ActualitiesView from './views/ActualitiesView';
import ReferencesView from './views/ReferencesView';
import ImpressumView from './views/ImpressumView';

import ScrollToTop from './others/ScrollToTop';
import HomePageLayout from './layouts/HomePageLayout';
import AdminView from './views/AdminView';
import ActualitiesFormView from './views/ActualitiesFormView';
import AboutUsView from './views/AboutUsView';

import AccountingPageView from './views/ServicesPages/AccountingPageView';
import React, { useEffect, useState } from 'react';
import { liveValue } from './services/crud';
function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [offerButtonOn, setOfferButtonOn] = useState(false);
  const [servicesButtonOn, setServicesButtonOn] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [dataArray, setDataArray] = useState([]);
  const [renderDate, setRenderDate] = useState(new Date().getHours());
  useEffect(() => {
    if (renderDate >= 19) {
      setSwitchChecked(false);
    }
    const liveChange = liveValue('ActualitiesDataBase', (snapshot) => {
      setDataArray(Object.entries(snapshot.val()));
    });
    return () => liveChange();
  }, [renderDate]);

  return (
    <div className='App'>
      <Routes>
        <Route
          element={
            <HomePageLayout
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              switchChecked={switchChecked}
              setSwitchChecked={setSwitchChecked}
            />
          }
        >
          <Route
            path='/'
            element={
              <HomePageView
                setSwitchChecked={setSwitchChecked}
                offerButtonOn={offerButtonOn}
                setOfferButtonOn={setOfferButtonOn}
                switchChecked={switchChecked}
              />
            }
          />
          <Route
            path='/aboutus'
            element={
              <AboutUsView
                setSwitchChecked={setSwitchChecked}
                switchChecked={switchChecked}
                offerButtonOn={offerButtonOn}
                setOfferButtonOn={setOfferButtonOn}
                servicesButtonOn={servicesButtonOn}
                setServicesButtonOn={setServicesButtonOn}
              />
            }
          />
          <Route
            path='/services'
            element={
              <AccountingPageView
                setSwitchChecked={setSwitchChecked}
                setOfferButtonOn={setOfferButtonOn}
                switchChecked={switchChecked}
              />
            }
          />

          <Route
            path='/actualities'
            element={
              <ActualitiesView
                setSwitchChecked={setSwitchChecked}
                actualitiesArray={dataArray}
                switchChecked={switchChecked}
                perPage={8}
                setToDefault={() => {}}
              />
            }
          />
          <Route
            path='/references'
            element={
              <ReferencesView
                setSwitchChecked={setSwitchChecked}
                switchChecked={switchChecked}
              />
            }
          />

          <Route
            path='/admin'
            element={
              <AdminView
                switchChecked={switchChecked}
                isLogged={isLogged}
                setIsLogged={setIsLogged}
              />
            }
          />
          <Route
            path='/actualitiesForm'
            element={
              <ActualitiesFormView
                actualitiesArray={dataArray}
                switchChecked={switchChecked}
                setIsLogged={setIsLogged}
                isLogged={isLogged}
                perPage={8}
                setToDefault={() => {}}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
