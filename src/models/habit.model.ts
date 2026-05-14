import { Habit } from "@/types/habit.types";
import mongoose, { Schema } from "mongoose";

const habitSchema = new Schema<Habit>({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  userId: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const HabitModel =
  mongoose.models.Habit || mongoose.model("Habit", habitSchema);