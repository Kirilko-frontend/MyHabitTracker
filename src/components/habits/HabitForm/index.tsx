'use client';
import { useState } from 'react';

import { useHabits } from '@/hooks/useHabits';

import text from './text';

const HabitForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { createHabit, isLoading } = useHabits();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createHabit(
      {
        title,
        description,
        userId: '123',
      },
      {
        onSuccess: () => {
          setTitle('');
          setDescription('');
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="habit-form flex flex-col gap-4 w-full max-w-md"
    >
      <input
        className="border rounded-2xl p-2 w-full placeholder:text-gray-500 placeholder:italic"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder={text.placeholderTitle}
      />
      <input
        className="border rounded-2xl p-2 w-full placeholder:text-gray-500 placeholder:italic"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder={text.placeholderDescription}
      />
      <button
        disabled={isLoading}
        className="bg-purple-300 text-lg text-white rounded-2xl py-0.5 disabled:opacity-50"
      >
        {isLoading ? 'Adding...' : text.submitButtonText}
      </button>
    </form>
  );
};

export default HabitForm;
