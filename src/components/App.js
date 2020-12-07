import React, { Suspense } from 'react';
import { Switch } from "react-router-dom";
import { useSelector } from 'react-redux';
// import { useWindowWidth } from '@react-hook/window-size';

import styles from './App.module.css';

import SpinerLoader from "./spinerLoader/SpinerLoader";

import routes from '../routes/routes';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';
import Header from "./Header/Header"
// import DailyAddProductForm from '../components/DiaryAddProductForm/DiaryAddProductForm';
// import OpenFormAddProductInDiary from '../components/OpenFormAddProductInDiary/OpenFormAddProductInDiary';
import CurrentDate from './currentDate/CurrentDate';

function App() {

  const token = useSelector(state => state.token);
  // const onlyWidth = useWindowWidth();

  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* {onlyWidth < 768 ? <OpenFormAddProductInDiary /> : <DailyAddProductForm />} */}
        <CurrentDate />
        {/*для відображення сторінок Не видаляти! */}
        <Suspense fallback={<SpinerLoader />}>
          <Switch>
            {routes.map((route) => {
              return route.private ? (
                <PrivateRoute key={route.label} {...route} />
              ) : (
                  <PublicRoute key={route.label} {...route} />
                );
            })}
          </Switch>
        </Suspense>
      </div>
    </>
  );
}

export default App;
