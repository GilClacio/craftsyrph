import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const contentPath = path.join(process.cwd(), 'data', 'siteContent.json');

export async function GET() {
  try {
    const data = await fs.promises.readFile(contentPath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (err) {
    return NextResponse.json({ error: 'Unable to read content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Basic validation
    if (!body) return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });

    await fs.promises.writeFile(contentPath, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Unable to save content' }, { status: 500 });
  }
}
