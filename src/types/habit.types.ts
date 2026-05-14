export interface Habit {
  _id: string;

  title: string;

  description: string;

  completed: boolean;

  userId: string;

  createdAt: Date;
}