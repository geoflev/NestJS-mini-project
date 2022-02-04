import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateVersionCommand } from "./commands/create-version.command";
import { DeleteVersionCommand } from "./commands/delete-version.command";
import { UpdateVersionCommand } from "./commands/update-version.command";
import { GetSingleVersionQuery } from "./queries/get-single-version.query";
import { GetAllVersionsQuery } from "./queries/get-versions.query";
import { CreateVersionForm, UpdateVersionForm, VersionDto } from "./versions.dtos";

@Controller('api/versions')
export class VersionsController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus
    ) { }

    @Get()
    async getVersions(): Promise<VersionDto[]> {
        return await this.queryBus.execute(new GetAllVersionsQuery());
    }

    @Get(':id')
    async getSingleVersion(@Param('id') id: string): Promise<VersionDto> {
        return await this.queryBus.execute(new GetSingleVersionQuery(id));
    }

    @Post()
    async createVersion(@Body() form: CreateVersionForm): Promise<VersionDto> {
        return await this.commandBus.execute(new CreateVersionCommand(form));
    }

    @Put(':id')
    async updateVersion(@Body() form: UpdateVersionForm, @Param('id') id: string) {
        return await this.commandBus.execute(new UpdateVersionCommand(id, form));
    }

    @Delete(':id')
    async deleteVersion(@Param('id') id: string): Promise<void> {
        return await this.commandBus.execute(new DeleteVersionCommand(id));
    }
}