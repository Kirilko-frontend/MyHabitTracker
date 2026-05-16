'use client';

import text from './text';
import HabitForm from '@/components/habits/HabitForm';
import HabitsList from '@/components/habits/HabitsList';
import { useQuery } from '@tanstack/react-query';
import { getHabits } from '@/api/habits';

const userId = '123';

const Habits = () => {
  const { data = [] } = useQuery({
    queryKey: ['habits', userId],
    queryFn: () => getHabits(userId),
  });

  console.log(data);

  return (
    <div className="habits flex flex-col items-center gap-4">
      <div className="habits__header flex flex-col gap-2 self-start">
        <h1 className="text-4xl text-white">{text.title}</h1>
        <p className="text-2xl text-gray-300">{text.description}</p>
      </div>

      <HabitForm />

      <HabitsList data={data} className="flex flex-col gap-4" />
    </div>
  );
};

export default Habits;
