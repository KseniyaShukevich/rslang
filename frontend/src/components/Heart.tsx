import React from 'react';
import { Favorite, FavoriteBorder } from '@material-ui/icons'

interface IProps {
  lifes: number
}

const Heart: React.FC<IProps> = ({ lifes }: IProps) => {
  if (lifes < 0) {
    lifes = 0;
  }
  const arrZero = Array(5 - lifes).fill(0);
  const arrOne = Array(lifes).fill(1);
  const arr = [ ...arrZero, ...arrOne ];

  return (
    <>
      {
        arr.map((el, i) =>
          el ? (
            <Favorite
              style={{color: 'white'}}
              fontSize="small"
              key={i}
            />
          ) : (
            <FavoriteBorder
              style={{color: 'white'}}
              fontSize="small"
              key={i}
            />
          )
        )
      }
    </>
  );
}

export default Heart;
