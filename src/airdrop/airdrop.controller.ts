import { Controller, Get, Param } from '@nestjs/common';
import { AirdropService } from './airdrop.service';

@Controller('airdrop')
export class AirdropController {
    constructor(private readonly airdropService: AirdropService) {}

    @Get("/:id")
    airdrop(@Param('id') id: string): Promise<void> {
        return this.airdropService.airdrop(id);
    }
}
