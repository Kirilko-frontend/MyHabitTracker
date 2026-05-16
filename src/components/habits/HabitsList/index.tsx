import { Habit } from '@/types/habit.types';

import HabitCard from '../HabitCard';

interface IProps {
  data: Habit[];
  className?: string;
}

const HabitsList = ({ data, className }: IProps) => {
  return (
    <ul className={`habits-list ${className || ''}`}>
      {data.map((habit) => (
        <HabitCard key={habit._id} habit={habit} />
      ))}
    </ul>
  );
};

export default HabitsList;
