import { NextResponse } from 'next/server';
import { getProduct } from '../../../../lib/shop';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const product = getProduct(id);
  if (!product) {
    return NextResponse.json({ message: 'Produit introuvable' }, { status: 404 });
  }
  return NextResponse.json(product);
}
