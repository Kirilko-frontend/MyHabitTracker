'use client';

import { useHabits } from '@/hooks/useHabits';

import HabitForm from '@/components/habits/HabitForm';
import HabitsList from '@/components/habits/HabitsList';

import text from './text';

const Habits = () => {
  const { habits } = useHabits();

  return (
    <div className="habits flex flex-col items-center gap-4">
      <div className="habits__header flex flex-col gap-2 self-start">
        <h1 className="text-4xl text-white">{text.title}</h1>
        <p className="text-2xl text-gray-300">{text.description}</p>
      </div>

      <HabitForm />

      <HabitsList habits={habits} className="flex flex-col gap-4" />
    </div>
  );
};

export default Habits;
