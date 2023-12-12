import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { OrderService } from './order.service';
import { UserID } from '../decorators/user-id.decorator';
import { OrderEntity } from './entities/order.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnOrderDto } from './dtos/return-order.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService
    ) {}

    @Post()
    async createOrder(
        @Body() createOrder: CreateOrderDTO,
        @UserID() userId: string,
    ): Promise<OrderEntity> {
        return this.orderService.createOrder(createOrder, userId);
    };

    @Get()
    async findOrderByUserId(@UserID() userId: string): Promise<OrderEntity[]> {
        return this.orderService.findOrderByUserId(userId);
    };

    @Roles(UserType.Admin)
    @Get('/all')
    async findAllOrder(): Promise<ReturnOrderDto[]> {
        return (await this.orderService.findAllOrders()).map((order) => new ReturnOrderDto(order))
    };

    @Get('/:orderId')
    async findOrderByID(@Param('orderId') orderId: number): Promise<ReturnOrderDto> {
        
        return new ReturnOrderDto(
            (await this.orderService.findOrderByUserId(undefined, orderId))[0]
        );
    }

}
