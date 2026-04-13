import { NextRequest, NextResponse } from 'next/server';

// Mock users
const users = new Map<string, any>();

export async function POST(req: NextRequest) {
  const { action, email, password } = await req.json();
  
  if (action === 'register') {
    if (users.has(email)) {
      return NextResponse.json({ error: 'User exists' }, { status: 400 });
    }
    users.set(email, { id: email.replace('@', '_'), name: '', email, token: 'mock-token-' + Date.now() });
    return NextResponse.json({ token: users.get(email).token, user: users.get(email) });
  }
  
  if (action === 'login') {
    const user = users.get(email);
    if (user && password === '1234') {
      return NextResponse.json({ token: user.token, user });
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  
  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

