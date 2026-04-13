import { NextRequest, NextResponse } from 'next/server';

// Mock in-memory storage
let expenses: any[] = [];
let nextId = 1;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const expense = {
      id: nextId++,
      ref: `BANG-${Date.now()}`,
      userId: body.userId || 'anonymous',
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    expenses.push(expense);
    return NextResponse.json({ success: true, expense }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  const filtered = userId ? expenses.filter(e => e.userId === userId) : expenses;
  // Flat view for dashboard compatibility
  const flatExpenses = filtered.map(e => ({
    ...e.data,
    id: e.id,
    ref: e.ref,
    total: e.total,
    status: e.status,
    createdAt: e.createdAt,
    files: e.files || [],
  }));
  return NextResponse.json(flatExpenses);
}

