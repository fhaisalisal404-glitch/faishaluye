import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const todos = await prisma.todo.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const { title, description } = await request.json();
  const todo = await prisma.todo.create({
    data: { title, description },
  });
  return NextResponse.json(todo, { status: 201 });
}