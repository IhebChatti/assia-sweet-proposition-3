import type { Metadata } from 'next';
import type { ReactNode } from 'react';
export const metadata: Metadata = {title:'Assia Sweet — Le royaume gourmand',description:'Le royaume gourmand Assia Sweet. Prototype de boutique au détail.'};
export default function RootLayout({children}:{children:ReactNode}) {return <html lang="fr"><head><link rel="stylesheet" href="/style.css"/><link rel="stylesheet" href="/pop.css"/><link rel="stylesheet" href="/kingdom.css"/></head><body suppressHydrationWarning>{children}</body></html>;}
