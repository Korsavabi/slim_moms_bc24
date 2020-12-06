import React, { Suspense } from 'react';
import { Switch } from "react-router-dom";
import { useSelector } from 'react-redux';
import styles from './App.module.css';

import SpinerLoader from "./spinerLoader/SpinerLoader";


import routes from '../routes/routes';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';
import BgImage from './BgImage/BgImage'
import DailyAddProductForm from '../components/DiaryAddProductForm/DiaryAddProductForm';
import OpenFormAddProductInDiary from '../components/OpenFormAddProductInDiary/OpenFormAddProductInDiary';

function App() {

  const token = useSelector(state => state.token);

  return (
    <>
      <BgImage />
      <div className={styles.container}>
        <DailyAddProductForm />
        <OpenFormAddProductInDiary />
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
