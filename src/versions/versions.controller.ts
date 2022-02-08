import { Body, Controller, Delete, Get, Param, Post, Put, } from "@nestjs/common";
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
@Controller('api/project/')
export class VersionsController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus
    ) { }

    @Get(':projectId/versions')
    @ApiOperation({ summary: 'List all versions' })
    async getVersions(@Param('projectId') projectId: string): Promise<VersionDto[]> {
        return await this.queryBus.execute(new GetAllVersionsQuery(projectId));
    }

    @Get(':projectId/versions/:versionId')
    @ApiOperation({ summary: 'Get single version' })
    async getSingleVersion(
        @Param('projectId') projectId: string,
        @Param('versionId') versionId: string
        ): Promise<VersionDto> {
        return await this.queryBus.execute(new GetSingleVersionQuery(projectId, versionId));
    }

    @Post(':projectId/versions')
    @ApiOperation({ summary: 'Create version' })
    async createVersion(
        @Param('projectId') projectId: string,
        @Body() form: CreateVersionDto
    ): Promise<VersionDto> {
        return await this.commandBus.execute(new CreateVersionCommand(form, projectId));
    }

    @Put(':projectId/version/:versionId')
    @ApiOperation({ summary: 'Update version' })
    async updateVersion(
        @Body() form: UpdateVersionDto, 
        @Param('projectId') projectId: string,
        @Param('versionId') versionId: string) {
        return await this.commandBus.execute(new UpdateVersionCommand(projectId, versionId, form));
    }

    @Delete(':projectId/version/:versionId')
    @ApiOperation({ summary: 'Delete version' })
    async deleteVersion(
        @Param('projectId') projectId: string,
        @Param('versionId') versionId: string
    ): Promise<void> {
        return await this.commandBus.execute(new DeleteVersionCommand(projectId, versionId));
    }
}