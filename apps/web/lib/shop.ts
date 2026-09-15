import catalog from '../../api/src/data/catalog.json';

export type CatalogProduct = (typeof catalog.products)[number];

type QuoteLineInput = {
  id: string;
  weight: number;
  qty: number;
};

/**
 * Shared shop data helpers used by Next.js API routes on Netlify.
 * Mirrors the Nest `ShopService` so local Nest and production Next stay aligned.
 */
export function getBootstrap() {
  return { products: catalog.products, orders: catalog.orders };
}

export function getProducts() {
  return catalog.products;
}

export function getProduct(id: string): CatalogProduct | undefined {
  return catalog.products.find((product) => product.id === id);
}

export function buildQuote(body: unknown) {
  if (
    !body ||
    typeof body !== 'object' ||
    !('items' in body) ||
    !Array.isArray((body as { items: unknown }).items) ||
    (body as { items: unknown[] }).items.length < 1 ||
    (body as { items: unknown[] }).items.length > 100
  ) {
    throw new Error('items : 1 à 100 lignes requises');
  }

  const items = (body as { items: unknown[] }).items.map((line) => {
    if (!line || typeof line !== 'object') {
      throw new Error('Ligne invalide');
    }

    const { id, weight, qty } = line as Record<string, unknown>;
    if (
      typeof id !== 'string' ||
      typeof weight !== 'number' ||
      ![250, 500, 1000].includes(weight) ||
      typeof qty !== 'number' ||
      !Number.isInteger(qty) ||
      qty < 1 ||
      qty > 99
    ) {
      throw new Error('Format ou quantité invalide');
    }

    const product = getProduct(id);
    if (!product) {
      throw new Error('Produit introuvable');
    }

    const unitCents = Math.round(
      product.price * 100 * (weight / 250) * (weight === 1000 ? 0.9 : weight === 500 ? 0.95 : 1),
    );
    const quoteLine: QuoteLineInput & { unitCents: number; totalCents: number } = {
      id,
      weight,
      qty,
      unitCents,
      totalCents: unitCents * qty,
    };
    return quoteLine;
  });

  const subtotalCents = items.reduce((sum, line) => sum + line.totalCents, 0);
  const shippingCents = subtotalCents >= 3900 ? 0 : 490;

  return {
    currency: 'EUR',
    items,
    subtotalCents,
    shippingCents,
    totalCents: subtotalCents + shippingCents,
    simulated: true,
  };
}
