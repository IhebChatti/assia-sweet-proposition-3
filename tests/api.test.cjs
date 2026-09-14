const {test}=require('node:test');
const assert=require('node:assert/strict');
const {ShopService}=require('../apps/api/dist/shop.service');
const shop=new ShopService();
test('catalog has sixteen unique products',()=>{const p=shop.products();assert.equal(p.length,16);assert.equal(new Set(p.map(x=>x.id)).size,16);});
test('quote calculates discounts and shipping in cents',()=>{const q=shop.quote({items:[{id:'oursons-fruites',weight:500,qty:2}]});assert.equal(q.items[0].unitCents,665);assert.equal(q.subtotalCents,1330);assert.equal(q.shippingCents,490);assert.equal(q.totalCents,1820);});
test('free shipping threshold and invalid input',()=>{assert.equal(shop.quote({items:[{id:'oursons-fruites',weight:250,qty:12}]}).shippingCents,0);for(const qty of [-1,0,1.5,100,'2'])assert.throws(()=>shop.quote({items:[{id:'oursons-fruites',weight:250,qty}]}));assert.throws(()=>shop.quote({items:[{id:'unknown',weight:250,qty:1}]}));assert.throws(()=>shop.quote({items:[]}));});
