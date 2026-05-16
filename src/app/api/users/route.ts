import { NextResponse } from 'next/server';
import { UserModel } from '@/models/user.model';
import connectDB from '@/services/db';

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, email, password } = body;

    const user = await UserModel.create({
      name,
      email,
      password,
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
