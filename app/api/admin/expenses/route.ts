import { NextRequest, NextResponse } from 'next/server';

let expenses: any[] = []; // Shared with /api/expenses

export async function GET(req: NextRequest) {
  return NextResponse.json(expenses);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = Number(await params.then(p => p.id));
  const body = await req.json();
  const expense = expenses.find(e => e.id === id);
  if (expense) {
    Object.assign(expense, body);
    return NextResponse.json(expense);
  }
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

