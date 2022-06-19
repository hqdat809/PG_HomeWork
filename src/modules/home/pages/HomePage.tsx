import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { fetchThunk } from 'modules/common/redux/thunk';
import ItemInfor from 'modules/component/ItemInfor';
import LoadingItemInfor from 'modules/component/LoadingItemInfor';
import { ROUTES } from 'configs/routes';
import { AppState } from 'redux/reducer';
import { IS_REMEMBER, IS_REMEMBER_FALSE } from 'utils/constants';
import {
  setListItem,
  setMoreItem,
  confirmChange,
  resetItems,
} from 'modules/home/redux/homeReducer';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const listItem = useSelector((state: AppState) => state.home.newInforItems);
  const isChanged = useSelector((state: AppState) => !state.home.isEqual);
  const buttonReset = document.getElementsByClassName('buttonReset');
  const buttonConfirm = document.getElementsByClassName('buttonConfirm');

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);

  const handleLogout = () => {
    Cookies.set(IS_REMEMBER, IS_REMEMBER_FALSE);
    dispatch(replace(ROUTES.login));
  };

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 1
    ) {
      console.log('scroll test');
      setPage(page + 1);
    }
  };

  const handleGetMoreItem = React.useCallback(async () => {
    setIsLoading(true);

    const json = await dispatch(
      fetchThunk(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${10}`, 'get')
    );

    if (page === 1) {
      dispatch(setListItem(json));
    } else {
      dispatch(setMoreItem(json));
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [page]);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    return scrollToTop();
  }, []);

  React.useEffect(() => {
    handleGetMoreItem();
  }, [page]);

  React.useEffect(() => {
    buttonReset[0].addEventListener('click', () => {
      dispatch(resetItems());
    });
  });

  React.useEffect(() => {
    buttonConfirm[0].addEventListener('click', () => {
      dispatch(confirmChange());
    });
  });

  return (
    <div>
      <header className="header">
        <h1>HomePage</h1>
        <button onClick={handleLogout} className="btn btn-primary">
          Đăng xuất
        </button>
      </header>

      <div className="content">
        <div className="buttons-mange">
          <button
            style={{ marginRight: '20px', border: 'none' }}
            // onClick={handleConfirm}
            disabled={!isChanged}
            className="buttonConfirm"
          >
            Confirm
          </button>
          <button
            className="buttonReset"
            style={{ marginRight: '20px', border: 'none' }}
            // onClick={(e) => handleReset(e)}
            disabled={!isChanged}
          >
            Reset
          </button>
        </div>

        {listItem &&
          listItem.map((item, index) => {
            return (
              <>
                <ItemInfor
                  buttonReset={buttonReset}
                  buttonConfirm={buttonConfirm}
                  item={item}
                  key={index}
                  setIsDataChanged={setIsDataChanged}
                />
              </>
            );
          })}
        {isLoading && (
          <>
            <LoadingItemInfor />
            <LoadingItemInfor />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
