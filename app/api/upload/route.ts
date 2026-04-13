import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File;
      if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });
      
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString('base64');
      const url = `/uploads/${Date.now()}-${file.name}`;
      
      return NextResponse.json({ url, preview: `data:${file.type};base64,${base64}` });
    } else {
      // JSON for cam {preview: dataUrl}
      const { preview } = await req.json();
      if (!preview) return NextResponse.json({ error: 'No preview' }, { status: 400 });
      
      const url = `/cam-${Date.now()}.jpg`;
      return NextResponse.json({ url, preview });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

