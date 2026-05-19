'use client';

import { useEffect, useState } from 'react';

import { useHabits } from '@/hooks/useHabits';

import { Habit } from '@/types/habit.types';

interface IProps {
  habit: Habit;
}

const HabitCard = ({ habit }: IProps) => {
  const { deleteHabit, updateHabit } = useHabits();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(habit.title);

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [description, setDescription] = useState(habit.description);

  useEffect(() => {
    setTitle(habit.title);
    setDescription(habit.description);
  }, [habit.title, habit.description]);

  return (
    <div
      id={habit._id}
      className="habit-card flex flex-col gap-2 p-4 bg-gray-800 rounded"
    >
      {isEditingTitle ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              updateHabit({
                id: habit._id,
                data: { title },
              });
              setIsEditingTitle(false);
            }
          }}
        />
      ) : (
        <h3 onDoubleClick={() => setIsEditingTitle(true)}>{habit.title}</h3>
      )}
      {isEditingDescription ? (
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              updateHabit({
                id: habit._id,
                data: { description },
              });
              setIsEditingDescription(false);
            }
          }}
        />
      ) : (
        <p onDoubleClick={() => setIsEditingDescription(true)}>
          {habit.description}
        </p>
      )}
      <button
        onClick={() =>
          updateHabit({
            id: habit._id,
            data: { completed: !habit.completed },
          })
        }
      >
        {habit.completed ? 'Mark as not done' : 'Mark as done'}
      </button>
      <p>{new Date(habit.createdAt).toLocaleString()}</p>
      <button onClick={() => deleteHabit(habit._id)}>Delete</button>
    </div>
  );
};

export default HabitCard;
