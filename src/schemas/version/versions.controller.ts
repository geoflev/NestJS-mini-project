import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateVersionDto } from './dto/create-version.dto';
import { Version } from './version.schema';
import { VersionsService } from './versions.service';

@Controller('versions')
export class VersionsController {
    constructor(private readonly versionService: VersionsService) { }

    @Post()
    async addVersion(@Body() createVersionDto: CreateVersionDto): Promise<Version> {
        const version = await this.versionService.insertVersion(createVersionDto);
        return version;
    }

    @Get()
    async getAllVersions() {
        return await this.versionService.getAllVersions();
    }

    @Get('/:id')
    async getSingleVersion(@Param('id') versionId: string) {
        return await this.versionService.getSingleVersion(versionId);
    }

    @Delete('/:id')
    async deleteVersion(@Param('id') versionId: string) {
        return await this.versionService.deleteVersion(versionId);
    }

    @Patch()
    async updateVersion(@Body() createVersionDto: CreateVersionDto) {
        return await this.versionService.updateVersion(createVersionDto);
    }
}