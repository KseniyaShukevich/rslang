import React, { useEffect } from 'react'
import PageLayout from '../components/PageLayout'
import { selectUser } from '../slices/userSlice'
import { useSelector } from 'react-redux'
import { clearTodayStatistics } from '../calcStatistics'

const Statistics: React.FC = () => {
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      clearTodayStatistics(user.userId, user.token);
    } else {
      clearTodayStatistics();
    }
  }, []);

  return (
    <PageLayout>
      <span/>
    </PageLayout>
  );
}

export default Statistics;
