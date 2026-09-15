import { NextResponse } from 'next/server';
import { getProducts } from '../../../lib/shop';

export async function GET() {
  return NextResponse.json(getProducts());
}
