import { IStatistics } from './interfaces';
import notificate from './utils/notificator';

export async function request(url: string, token: string = '', method: string = 'GET', data = null) {
  let headers: any = {};

  headers['Content-Type'] = 'application/json';
  headers.Accept = 'application/json';
  headers.Authorization = `Bearer ${token}`

  let options: any = {
     method, headers,
  }

  if (data) options.body = JSON.stringify(data)

  const response = await fetch(url, options);

  if (!response.ok) {
    notificate('Ошибка: ' + response.statusText)
    console.warn('Error', response.statusText);
    return null;
  }

  const result = await response.json();
  return result;
}


// Опции для слова пользователя:
// difficulty: "easy",
// optional: {
//   mode: learning | deleted
//   miniGames: {
//     firstGame: {
//       correctAnswers: 0,
//       wrongAnswers: 0,
//     },
//    ...
//   }
// }


// Статистика
// опции статистики:
// optional: {
//   today: {
//     miniGames: {
//       firstGame: {
//         date: 'sfdf',
//         countLearnedWords: 0,
//         correctAnswers: 0,
//         wrongAnswers: 0,
//         longestCorrectAnswers: 0
//       },
//       secondGame: {
//         ...
//       },
//       ...
//     },
//     generalStatistics: {
//       date: 'sfdf',
//       totalWordsLearned: 0,
//       totalCorrectAnswers: 0,
//       totalWrongAnswers: 0
//     }
//   },
//   forAllTime: {
//     forEachDay: [
//       {
//         date: 'dfdfs',
//         countLearnedWords: 0,
//       },
//       ...
//     ],
//     byDay: [
//         {
//           date: 'dfdfs',
//           countLearnedWords: 0,
//         },
//         ...
//     ]
//   }
// }

export const getWord = async (wordId: string) => {
  const response = await request(`/words/${wordId}`);
  return response;
}



export const fetchUserWords = async (userId: string, token: string) => {
  const response = await request(`/users/${userId}/words`, token);
  return response;
}
// Использование:
// fetchUserWords(
//   '6058ece36fab9b1ffdc9ae71',
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNThlY2UzNmZhYjliMWZmZGM5YWU3MSIsImlhdCI6MTYxNjU4ODEzOSwiZXhwIjoxNjE2NjAyNTM5fQ.3ftr9ZQelppOlL3b_QjSCIFQm-RWxwoj9vGRrdjgpEg",
//  );

export const fetchUserWord = async (userId: string, wordId: string, token: string) => {
  const response = await request(`/users/${userId}/words/${wordId}`, token);
  return response;
}


// Если у пользователя нет слова, которое он выбрал, чтобы поменить как "Сложное" или "Удаленное"
// или слово фигурировало в мини-игре
// создаем для пользвателя слово:
export const createUserWord = async (userId: string, wordId: string, body: any, token: string) => {
  const response = await request(`/users/${userId}/words/${wordId}`, token, 'POST', body);
  return response;
}
// Использование:
// createUserWord(
//   '6058ece36fab9b1ffdc9ae71',
//   '5e9f5ee35eb9e72bc21af4a7',
//   {
//     difficulty: "easy",
//     optional: {
//       mode: "learning"
//     }
//   },
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNThlY2UzNmZhYjliMWZmZGM5YWU3MSIsImlhdCI6MTYxNjU4ODEzOSwiZXhwIjoxNjE2NjAyNTM5fQ.3ftr9ZQelppOlL3b_QjSCIFQm-RWxwoj9vGRrdjgpEg",
//   );



export const updateUserWord = async (userId: string, wordId: string, body: any, token: string) => {
  const response = await request(`/users/${userId}/words/${wordId}`, token, 'PUT', body);
  return response;
}
// Использование
// Optional полностью перезаписывается, так что надо передавать все опции(и старые, и новые)
// difficulty не перезаписываетcя, если его не указывать, вроде
// updateUserWord(
//   '6058ece36fab9b1ffdc9ae71',
//   '5e9f5ee35eb9e72bc21af4a7',
//   {
//     // difficulty: "hard",
//     optional: {
//       mode: "learning",
//       tets: "test"
//     }
//   },
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNThlY2UzNmZhYjliMWZmZGM5YWU3MSIsImlhdCI6MTYxNjU4ODEzOSwiZXhwIjoxNjE2NjAyNTM5fQ.3ftr9ZQelppOlL3b_QjSCIFQm-RWxwoj9vGRrdjgpEg",
//   );

export const getUserStatistics = async (userId: string, token: string): Promise<IStatistics> => {
  const response = await request(`/users/${userId}/statistics`, token);
  return response;
}
// Использование:
//  getUserStatistics(
//     '6058ece36fab9b1ffdc9ae71',
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNThlY2UzNmZhYjliMWZmZGM5YWU3MSIsImlhdCI6MTYxNjU4ODEzOSwiZXhwIjoxNjE2NjAyNTM5fQ.3ftr9ZQelppOlL3b_QjSCIFQm-RWxwoj9vGRrdjgpEg",
//   );



export const updateUserStatistics = async (userId: string, body: any, token: string) => {
  const response = await request(`/users/${userId}/statistics`, token, 'PUT', body);
  return response;
}
// Испльзование:
//   updateUserStatistics(
//     '6058ece36fab9b1ffdc9ae71',
//     {
//       learnedWords: 0,
//       optional: {
//         games: 6,
//       }
//     },
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNThlY2UzNmZhYjliMWZmZGM5YWU3MSIsImlhdCI6MTYxNjU4ODEzOSwiZXhwIjoxNjE2NjAyNTM5fQ.3ftr9ZQelppOlL3b_QjSCIFQm-RWxwoj9vGRrdjgpEg",
//   );



// Опции настроек:
// optional: {
//   isTranslation: true,
//   isButtons: true
// }
export const getUserSettings = async (userId: string, token: string) => {
  const response = await request(`/users/${userId}/settings`, token);
  return response;
}
// Использование:
// getUserSettings(
//   '6058ece36fab9b1ffdc9ae71',
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNThlY2UzNmZhYjliMWZmZGM5YWU3MSIsImlhdCI6MTYxNjU4ODEzOSwiZXhwIjoxNjE2NjAyNTM5fQ.3ftr9ZQelppOlL3b_QjSCIFQm-RWxwoj9vGRrdjgpEg",
// );



export const updateUserSettings = async (userId: string, body: any, token: string) => {
  const response = await request(`/users/${userId}/settings`, token, 'PUT', body);
  return response;
}
//Использование:
// updateUserSettings(
//   '6058ece36fab9b1ffdc9ae71',
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNThlY2UzNmZhYjliMWZmZGM5YWU3MSIsImlhdCI6MTYxNjU4ODEzOSwiZXhwIjoxNjE2NjAyNTM5fQ.3ftr9ZQelppOlL3b_QjSCIFQm-RWxwoj9vGRrdjgpEg",
//   {
//     optional: {
//       isTranslation: true,
//       isButtons: false
//     }
//   }
// );

export const getAggregatedUserWords = async (mode: string, userId: string, group: number, page: number, token: string) => {
  let filter: string;

  if (mode === 'hard') {
    filter = '{"userWord.difficulty": "hard"}';
  } else if (mode === 'learning') {
    filter = '{"userWord.optional.mode": "learning"}';
  } else if (mode === 'deleted') {
    filter = '{"userWord.optional.mode": "deleted"}';
  } else {
    return null;
  }

  const response = await request(`/users/${userId}/aggregatedWords?group=${group}&page=${page}&filter=${filter}`, token);
  return response;
}
// Функция находит слова из указанного раздела на указанной странице
//Использование:
// getAggregatedUserWords(
//   'deleted', Сюда можно передавать одно из трех: hard | learning | deleted
//   '6058ece36fab9b1ffdc9ae71',
//   0,
//   0,
//   token
// );

export const getNotEmptyPages = async (userId: string, group: number, token: string) => {
  const filter = '{"userWord.optional.mode": "deleted"}';
  const response = await request(`/users/${userId}/aggregatedWords?group=${group}&wordsPerPage=10000&filter={"userWord.optional.mode": "deleted"}`, token);
  return response;
}
// Функция возвращает массив непустых страниц в группе пользователя - { name: 'Страница {n}', number: n }[]
// e=10000&filter={%22userWord.optional.mode%22:%20%22deleted%22}
// e=10000&filter={%22userWord.optional.mode%22:%20%22deleted%22}
