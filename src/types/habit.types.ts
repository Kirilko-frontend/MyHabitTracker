export interface Habit {
  _id: string;

  title: string;

  description: string;

  completed: boolean;

  userId: string;

  createdAt: Date;
}

export interface CreateHabit {
  title: string;

  description: string;

  userId: string;
}
