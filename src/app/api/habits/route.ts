import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { HabitModel } from '@/models/habit.model';
import connectDB from '@/services/db';
import { authOptions } from '@/auth';

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, description } = body;

    const habit = await HabitModel.create({
      title,
      description,
      userId: session.user.id,
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

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const habits = await HabitModel.find({
      userId: session.user.id,
    });

    return NextResponse.json(habits);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get habits' },
      { status: 500 }
    );
  }
}
