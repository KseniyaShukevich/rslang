import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { theme } from "../mui-style";
import Section1 from '../components/Section1';

const useStyles = makeStyles({
  contentWrapper: {
    // height: 'calc(100hv - 162px)',
    height: 1200,
    'max-width': 1920,
    margin: '0 auto',
    background: 'beige',
  },
});

const HomePage: React.FC<any> = () => {
  const classes = useStyles();

//   const dispatch = useDispatch();

//   const { lang, countryList, filterString } = useSelector<AppState, AppState>(state => state);
  
//   useEffect(() => {
//     dispatch(getDataFromBE(`/api/countries?lang=${Language[lang]}`));
//   }, [ lang ])  

//   const filteredCountryList = (filterString: string = '', list: ICountryCard[]) => {
//     const normalisedString = filterString.toLowerCase().trim();
//     return list.filter(
//       (item) =>
//         item.name.toLowerCase().includes(normalisedString) ||
//         item.capital.toLowerCase().includes(normalisedString)
//     );
//   };

  return (
    <>
      <div className={classes.contentWrapper}>
        <Section1 />
      </div>      
    </>
  );
}

export default HomePage;
