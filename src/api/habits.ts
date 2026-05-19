import { CreateHabit } from '@/types/habit.types';

export const getHabits = async (userId: string) => {
  const res = await fetch(`/api/habits?userId=${userId}`);
  return res.json();
};

export const createHabit = async (data: CreateHabit) => {
  const res = await fetch('/api/habits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteHabit = async (id: string) => {
  const res = await fetch(`/api/habits/${id}`, {
    method: 'DELETE',
  });

  return res.json();
};

export const updateHabit = async (
  id: string,
  data: Partial<{ title: string; description: string; completed: boolean }>
) => {
  const res = await fetch(`/api/habits/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
