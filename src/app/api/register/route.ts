import { NextResponse } from 'next/server';
import { UserModel } from '@/models/user.model';
import connectDB from '@/services/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, password } = body;

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('REGISTER BODY:', body);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log('CREATED USER:', user);

    return NextResponse.json({
      id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
