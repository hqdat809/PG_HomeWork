import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { IDataItem } from 'models/home';
import { compareToArray, changeItems } from '../home/redux/homeReducer';

interface Props {
  buttonReset: HTMLCollection;
  buttonConfirm: HTMLCollection;
  item: IDataItem;
  setIsDataChanged(values: boolean): void;
}

const ItemInfor = (props: Props) => {
  const dispatch = useDispatch();

  const { item } = props;
  const [title, setTitle] = React.useState(item.title);
  const [isEdditting, SetIsEdditting] = React.useState(false);

  React.useEffect(() => {
    setTitle(item.title);
  }, [item.title]);

  const handleClickTitle = () => {
    SetIsEdditting(true);
  };

  const handleBlurTitle = (e: any) => {
    SetIsEdditting(false);

    if (title !== item.title) {
      dispatch(
        changeItems({
          id: item.id,
          title: e.target.value,
        })
      );

      dispatch(compareToArray());
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '800px', height: '200px' }}>
        <Box sx={{ margin: 1 }}>
          {
            <div className="wrapper-img-item">
              <img className="img-item" src={item.url} />
            </div>
          }
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ width: '100%' }}>
            {
              <Typography>
                <div>
                  {!isEdditting ? (
                    <h5 onClick={handleClickTitle} className="title-item">
                      {item.title}
                    </h5>
                  ) : (
                    <input
                      style={{ width: '100%' }}
                      value={title}
                      type="text"
                      autoFocus
                      onChange={(e) => setTitle(e.target.value)}
                      onBlur={(e) => handleBlurTitle(e)}
                    ></input>
                  )}
                </div>
              </Typography>
            }
          </Box>
          <Box sx={{ width: '100%' }}>
            {
              <Typography>
                <p className="title-item">{Date.now()}</p>
              </Typography>
            }
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default React.memo(ItemInfor);
