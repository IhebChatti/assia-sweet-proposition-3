import { NextResponse } from 'next/server';
import { getBootstrap } from '../../../lib/shop';

export async function GET() {
  return NextResponse.json(getBootstrap());
}
