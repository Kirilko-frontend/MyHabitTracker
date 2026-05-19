import { NextResponse } from 'next/server';

import connectDB from '@/services/db';

import { HabitModel } from '@/models/habit.model';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await req.json();

    const updatedHabit = await HabitModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(updatedHabit);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update habit' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    await HabitModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete habit' },
      { status: 500 }
    );
  }
}
