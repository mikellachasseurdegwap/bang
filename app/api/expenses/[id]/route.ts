import { NextRequest, NextResponse } from 'next/server';

// Mock storage partagé (même module que route.ts)
declare global {
  var expenses: any[];
  var nextId: number;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const userId = req.nextUrl.searchParams.get('userId') || 'anonymous';

  const expense = globalThis.expenses.find(e => e.id === id && e.userId === userId);

  if (!expense) {
    return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
  }

  // Retourne nested complet (pour détail/admin), pas flat
  return NextResponse.json(expense);
}

