import { NextResponse } from 'next/server';
import { buildQuote } from '../../../lib/shop';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json(buildQuote(body));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Requête invalide';
    const status = message === 'Produit introuvable' ? 404 : 400;
    return NextResponse.json({ message }, { status });
  }
}
