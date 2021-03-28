import React from 'react';
import { Favorite, FavoriteBorder } from '@material-ui/icons'

interface IProps {
  lifes: number
}

const Heart: React.FC<IProps> = ({ lifes }: IProps) => {
  const arrZero = Array(5 - lifes).fill(0);
  const arrOne = Array(lifes).fill(1);
  const arr = [ ...arrZero, ...arrOne ];

  return (
    <>
      {
        arr.map((el) => {
          if (el)
                return <Favorite
                style={{color: 'white'}}
                fontSize="small"
                />
          return <FavoriteBorder
          style={{color: 'white'}}
          fontSize="small"
          />
        })
      }
    </>
  );
}

export default Heart;
