'use client';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createHabit } from '@/api/habits';

import text from './text';

const HabitForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate(
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
        disabled={mutation.isPending}
        className="bg-purple-300 text-lg text-white rounded-2xl py-0.5 disabled:opacity-50"
      >
        {mutation.isPending ? 'Adding...' : text.submitButtonText}
      </button>
    </form>
  );
};

export default HabitForm;
