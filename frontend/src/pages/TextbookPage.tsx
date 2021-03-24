import React, { useEffect } from  'react';
import PageLayout from "../components/PageLayout";
import { fetchWords, selectWords } from "../slices/wordsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import WordCard from "../components/WordCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
  })
);

const TextBookPage: React.FC = () => {
  const { book, page } = useParams<Record<string, string>>();
  const words = useSelector(selectWords);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    // общая информация о словах
    dispatch(
      fetchWords({
        group: Number(book),
        page: Number(page),
      })
    );
  }, []);

  useEffect(() => {
    console.log(words);
  }, [words]);

  return (
    <PageLayout>
      <div>
      <WordCard
                word="detrimental"
                audio="https://freesound.org/data/previews/401/401736_7744890-lq.mp3"
                wordTranslate="вредный"
                image="https://avatars.mds.yandex.net/get-zen_doc/175604/pub_5d3edd5d14f98000ad739d66_5d3ede27c49f2900ad0b39f5/scale_1200"
                transcription="[əgríː]"
                textExample="The students agree they have too much homework"
                textMeaning="To agree is to have the same opinion or belief as another person"
                audioMeaning="https://freesound.org/data/previews/401/401736_7744890-lq.mp3"
                audioExample="https://freesound.org/data/previews/401/401736_7744890-lq.mp3"
                textMeaningTranslate="Согласиться - значит иметь то же мнение или убеждение, что и другой человек"
                textExampleTranslate="Студенты согласны, что у них слишком много домашней работы"
                dificult={false}
      />
      </div>
    </PageLayout>
  )
}

export default TextBookPage;
