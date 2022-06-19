import React, { memo } from 'react';

import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IDataItem } from 'models/home';

const LoadingItemInfor = () => {
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '800px', height: '200px' }}>
        <Box sx={{ margin: 1 }}>
          {
            <Skeleton variant="rectangular">
              <div className="wrapper-img-item">
                <img className="img-item" />
              </div>
            </Skeleton>
          }
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ width: '100%' }}>
            {
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            }
          </Box>
          <Box sx={{ width: '100%' }}>
            {
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            }
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default React.memo(LoadingItemInfor);
