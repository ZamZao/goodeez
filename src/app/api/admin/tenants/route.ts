import { NextResponse } from 'next/server';
import { getAllPortals } from '@/lib/portals/loadPortalConfig';

export async function GET() {
  const tenants = await getAllPortals();
  return NextResponse.json(tenants);
}
