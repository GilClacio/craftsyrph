import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const contentPath = path.join(process.cwd(), 'data', 'siteContent.json');

export async function GET() {
  const defaultContent = {
    myJourney: [],
    skills: [],
    milestones: []
  };
  try {
    let data;
    try {
      data = await fs.promises.readFile(contentPath, 'utf-8');
    } catch (err) {
      // If file doesn't exist, create it with defaults
      await fs.promises.writeFile(contentPath, JSON.stringify(defaultContent, null, 2), 'utf-8');
      return NextResponse.json(defaultContent);
    }
    const parsed = JSON.parse(data);
    // Ensure all fields exist and are arrays
    return NextResponse.json({
      myJourney: Array.isArray(parsed.myJourney) ? parsed.myJourney : [],
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      milestones: Array.isArray(parsed.milestones) ? parsed.milestones : []
    });
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
