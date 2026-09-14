import {Body,Controller,Get,Param,Post} from '@nestjs/common';
import {ShopService} from './shop.service';
@Controller()
export class ShopController {
 constructor(private readonly shop:ShopService){}
 @Get('health') health(){return {status:'ok',mode:'demo'};}
 @Get('bootstrap') bootstrap(){return this.shop.bootstrap();}
 @Get('products') products(){return this.shop.products();}
 @Get('products/:id') product(@Param('id') id:string){return this.shop.product(id);}
 @Post('quotes') quote(@Body() body:unknown){return this.shop.quote(body);}
}
