import React from 'react';
import { Favorite, FavoriteBorder } from '@material-ui/icons'

interface IProps {
  life: number
}

const Heart: React.FC<IProps> = ({ life }: IProps) => {
  const smth = 0;

  return (
    <>
      {
        life
        ?
        (
          <Favorite
            style={{color: 'white'}}
            fontSize="small"
          />
        ) : (
          <FavoriteBorder
            style={{color: 'white'}}
            fontSize="small"
          />
        )
      }
    </>
  );
}

export default Heart;