'use client';

import { deleteHabit } from '@/api/habits';
import { Habit } from '@/types/habit.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IProps {
  habit: Habit;
}

const HabitCard = ({ habit }: IProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      console.log('invalidate triggered');
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);

    console.log(`Deleted habit with id: ${id}`); // Log the deleted habit ID
  };

  return (
    <div
      id={habit._id}
      className="habit-card flex flex-col gap-2 p-4 bg-gray-800 rounded"
    >
      <h3>{habit.title}</h3>
      <p>{habit.description}</p>
      <p>{habit.completed ? 'Completed' : 'Not Completed'}</p>
      <p>{new Date(habit.createdAt).toLocaleString()}</p>
      <button onClick={() => handleDelete(habit._id)}>Delete</button>
    </div>
  );
};

export default HabitCard;
