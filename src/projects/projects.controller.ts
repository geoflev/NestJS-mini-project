import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProjectCommand } from './commands/create-project.command';
import { DeleteProjectCommand } from './commands/delete-project.command';
import { UpdateProjectCommand } from './commands/update-project.command';
import { GetAllProjectsQuery } from './queries/get-projects.query';
import { GetSingleProjectQuery } from './queries/get-single-project';
import { ApiOperation, ApiBody, ApiTags } from "@nestjs/swagger";
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectDto } from './dtos/project.dto';

@ApiTags('projects')
@Controller('api/projects')
export class ProjectsController {

    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus
    ) { }

    @Get()
    @ApiOperation({ summary: 'List all projects' })
    async getProjects(): Promise<ProjectDto[]> {
        return await this.queryBus.execute(new GetAllProjectsQuery());
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find a project' })
    async getProject(@Param('id') id: string): Promise<ProjectDto> {
        return await this.queryBus.execute(new GetSingleProjectQuery(id));
    }

    @Post()
    @ApiOperation({ summary: 'Create project' })
    @ApiBody({ type: CreateProjectDto })
    async createProject(@Body() form: CreateProjectDto): Promise<ProjectDto> {
        return await this.commandBus.execute(new CreateProjectCommand(form));
    }

    @Put(':projectId')
    @ApiOperation({ summary: 'Update project' })
    @ApiBody({ type: UpdateProjectDto })
    async updateProject(
        @Param('projectId') projectId: string,
        @Body() form: UpdateProjectDto): Promise<ProjectDto> {
        return await this.commandBus.execute(new UpdateProjectCommand(projectId, form))
    }

    @Delete(':projectId')
    @ApiOperation({ summary: 'Delete project' })
    async deleteProject(
        @Param('projectId') projectId: string): Promise<void> {
        return await this.commandBus.execute(new DeleteProjectCommand(projectId))
    }
}