import { NextResponse } from 'next/server';
import { HabitModel } from '@/models/habit.model';
import connectDB from '@/services/db';

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { title, description, userId } = body;

    const habit = await HabitModel.create({
      title,
      description,
      userId,
      completed: false,
      createdAt: new Date(),
    });

    return NextResponse.json(habit);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create habit' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const habits = await HabitModel.find({ userId });

    return NextResponse.json(habits);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch habits' },
      { status: 500 }
    );
  }
}
