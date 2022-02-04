import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateVersionCommand } from "./commands/create-version.command";
import { DeleteVersionCommand } from "./commands/delete-version.command";
import { UpdateVersionCommand } from "./commands/update-version.command";
import { CreateVersionDto } from "./dtos/create-version.dto";
import { UpdateVersionDto } from "./dtos/update-version.dto";
import { VersionDto } from "./dtos/version.dto";
import { GetSingleVersionQuery } from "./queries/get-single-version.query";
import { GetAllVersionsQuery } from "./queries/get-versions.query";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('versions')
@Controller('api/versions')
export class VersionsController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus
    ) { }

    @Get()
    @ApiOperation({ summary: 'List all versions' })
    async getVersions(): Promise<VersionDto[]> {
        return await this.queryBus.execute(new GetAllVersionsQuery());
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get single version' })
    async getSingleVersion(@Param('id') id: string): Promise<VersionDto> {
        return await this.queryBus.execute(new GetSingleVersionQuery(id));
    }

    @Post()
    @ApiOperation({ summary: 'Create version' })
    async createVersion(@Body() form: CreateVersionDto): Promise<VersionDto> {
        return await this.commandBus.execute(new CreateVersionCommand(form));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update version' })
    async updateVersion(@Body() form: UpdateVersionDto, @Param('id') id: string) {
        return await this.commandBus.execute(new UpdateVersionCommand(id, form));
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete version' })
    async deleteVersion(@Param('id') id: string): Promise<void> {
        return await this.commandBus.execute(new DeleteVersionCommand(id));
    }
}