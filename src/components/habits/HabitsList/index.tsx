import { Habit } from '@/types/habit.types';

import HabitCard from '../HabitCard';

interface IProps {
  habits: Habit[];
  className?: string;
}

const HabitsList = ({ habits, className }: IProps) => {
  return (
    <ul className={`habits-list ${className || ''}`}>
      {habits.map((habit) => (
        <HabitCard key={habit._id} habit={habit} />
      ))}
    </ul>
  );
};

export default HabitsList;
