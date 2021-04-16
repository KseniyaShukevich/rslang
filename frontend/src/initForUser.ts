import {
        INIT_USER_STATISTICS,
        INIT_USER_SETTINGS,
        ID_LOCALE_STORAGE
      } from './utils/constants'
import {
        updateUserStatistics,
        updateUserSettings
       } from './requests'
import { getDate } from './calcStatistics'

const updateDate = (todayStatistics: any) => {
  const today: string = getDate();

  todayStatistics.miniGames.savannah.date = today;
  todayStatistics.miniGames.audio.date = today;
  todayStatistics.miniGames.sprint.date = today;
  todayStatistics.miniGames.ownGame.date = today;
  todayStatistics.generalStatistics.date = today;
}

export const addInitToLStorage = () => {
  const statistics: string | null = localStorage.getItem(`${ID_LOCALE_STORAGE}statistics`);
  if (!statistics) {
    const todayStatistics = Object.assign(INIT_USER_STATISTICS.optional.today);

    updateDate(todayStatistics);

    localStorage.setItem(`${ID_LOCALE_STORAGE}statistics`, JSON.stringify({
      optional: {
        today: todayStatistics,
      }
    }));
  }
  const settings: string | null = localStorage.getItem(`${ID_LOCALE_STORAGE}settings`);
  if (!settings) {
    localStorage.setItem(`${ID_LOCALE_STORAGE}settings`, JSON.stringify(INIT_USER_SETTINGS));
  }
}

export const addInitToDB = async (
  userId: string,
  token: string
) => {
  const statistics = Object.assign(INIT_USER_STATISTICS);
  updateDate(statistics.optional.today);
  const today = getDate();
  statistics.optional.forAllTime.byDay.date = today;
  statistics.optional.forAllTime.forEachDay.date = today;
  updateUserStatistics(
      userId,
      statistics,
      token
    );
  updateUserSettings(
    userId,
    INIT_USER_SETTINGS,
    token
  );
}
