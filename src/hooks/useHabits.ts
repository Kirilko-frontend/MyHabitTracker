import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createHabit, deleteHabit, getHabits, updateHabit } from '@/api/habits';

export const useHabits = () => {
  const queryClient = useQueryClient();

  const habitsQuery = useQuery({
    queryKey: ['habits'],
    queryFn: () => getHabits('123'),
  });

  const createMutation = useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['habits'],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<{ title: string; description: string; completed: boolean }>;
    }) => updateHabit(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['habits'], exact: false });
    },
  });

  return {
    habits: habitsQuery.data ?? [],
    isLoading: habitsQuery.isLoading,

    createHabit: createMutation.mutate,
    deleteHabit: deleteMutation.mutate,
    updateHabit: updateMutation.mutate,
  };
};
