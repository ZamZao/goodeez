import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { LogoPlacement } from '@/lib/utils/types';

const dataFilePath = path.join(process.cwd(), 'src/data/logo-placements.json');

export async function GET() {
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    const data = JSON.parse(fileContent);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading logo placements:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validate body if necessary, for now assume it's a valid Record<string, LogoPlacement>
    
    fs.writeFileSync(dataFilePath, JSON.stringify(body, null, 2), 'utf8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving logo placements:', error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
