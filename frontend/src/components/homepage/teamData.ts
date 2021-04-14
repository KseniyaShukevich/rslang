import ksu from "../../assets/images_HomePage/ksu.jpg";
import yegor from "../../assets/images_HomePage/yegor.jpeg";
import polina from "../../assets/images_HomePage/polina.jpeg";
import marina from "../../assets/images_HomePage/marina.jpg";
import slava from "../../assets/images_HomePage/slava.jpg";


export interface IPersonData {
  name: string;
  pictureUrl: string;
  githubUrl: string;
  description: string;
}

export const team: IPersonData[] = [
  {
    name: 'Ксения\n Шукевич',
    pictureUrl: ksu,
    githubUrl: 'https://github.com/KseniyaShukevich',
    description: 'Идейный вдохновитель, основная структура, запросы на бэк, подсчет статистики, словарь, игра "Саванна"',
  },
  {
    name: 'Егор\n Глушанко',
    pictureUrl: yegor,
    githubUrl: 'https://github.com/GYegor',
    description: 'Бэк, регистрация, логин, меню, главная страница, статистика (отображение), анимация',
  },
  {
    name: 'Полина\n Четин',
    pictureUrl: polina,
    githubUrl: 'https://github.com/pacetin',
    description: 'Электронный учебник (главная страница, страница со списком слов), игра "Cпринт"',
  },
  {
    name: 'Марина\n Юркевич',
    pictureUrl: marina,
    githubUrl: 'https://github.com/MarinaYur',
    description: 'Главная страница, хэдер, футер, меню, страница мини-игр, сбор и анализ информации',
  },
  {
    name: 'Святослав\n Лобиков',
    pictureUrl: slava,
    githubUrl: 'https://github.com/pacetin',
    description: 'Электронный учебник (слова, озвучка), игры "Слово-перевод", "Аудиовызов"',
  },
]

