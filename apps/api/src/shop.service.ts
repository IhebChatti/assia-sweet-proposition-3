import {BadRequestException,Injectable,NotFoundException} from '@nestjs/common';
import data from './data/catalog.json';
@Injectable()
export class ShopService {
 bootstrap(){return {products:data.products,orders:data.orders};}
 products(){return data.products;}
 product(id:string){const p=data.products.find(p=>p.id===id);if(!p)throw new NotFoundException('Produit introuvable');return p;}
 quote(body:unknown){
  if(!body||typeof body!=='object'||!('items' in body)||!Array.isArray(body.items)||body.items.length<1||body.items.length>100)throw new BadRequestException('items : 1 à 100 lignes requises');
  const items=body.items.map((line:unknown)=>{
   if(!line||typeof line!=='object')throw new BadRequestException('Ligne invalide');
   const {id,weight,qty}=line as Record<string,unknown>;
   if(typeof id!=='string'||typeof weight!=='number'||![250,500,1000].includes(weight)||typeof qty!=='number'||!Number.isInteger(qty)||qty<1||qty>99)throw new BadRequestException('Format ou quantité invalide');
   const product=this.product(id);const unitCents=Math.round(product.price*100*(weight/250)*(weight===1000?.9:weight===500?.95:1));
   return {id,weight,qty,unitCents,totalCents:unitCents*qty};
  });
  const subtotalCents=items.reduce((sum,line)=>sum+line.totalCents,0);const shippingCents=subtotalCents>=3900?0:490;
  return {currency:'EUR',items,subtotalCents,shippingCents,totalCents:subtotalCents+shippingCents,simulated:true};
 }
}
