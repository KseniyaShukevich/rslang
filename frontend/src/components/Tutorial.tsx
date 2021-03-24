import React, { useEffect } from 'react'
import PageLayout from './PageLayout'
import { fetchWords, selectWords } from '../slices/wordsSlice'
import { useSelector, useDispatch } from 'react-redux'

// Словарь доступен только авторизованным пользователям

const Tutorial: React.FC = () => {
  const words = useSelector(selectWords);
  const dispatch = useDispatch();

  useEffect(() => {
    // общая информация о словах
    dispatch(fetchWords({
      group: 0,
      page: 0,
    }))
  }, []);

  useEffect(() => {
    console.log(words);
  }, [words]);

  return (
    <PageLayout>

      <span>
        Страница учебника(разделы) видна, если isDictionary = false и isPages = false
        Если пользователь авторизован, есть словарь(при нажатии на словарь setIsDictionary(true))
      </span>

      <span>
        Если открывается словарь (isDictionary = true)
        Назад к учебнику (setIsDictionary(false))
      </span>

      <span>
        Если открывается раздел (isPages = true)
        Страница со словами, иконка настроек
        Назад к учебнику (setIsPage(false))

        На странице со словами:
        Если пользователь не авторизован, получаем только общую информацию о словах
        Если авторизон: плучаем общую информацию о словах + слова пользователя с опциями
      </span>
      <span>
        Ссылки на мини-игры
        Видны, если isPages = true
      </span>

    </PageLayout>
  );
}

export default Tutorial;
