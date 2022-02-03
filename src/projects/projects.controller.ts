import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProjectCommand } from './commands/create-project.command';
import { UpdateProjectCommand } from './commands/update-project.command';
import { CreateProjectForm, ProjectDto } from './projects.dtos';
import { GetAllProjectsQuery } from './queries/get-projects.query';
import { GetSingleProjectQuery } from './queries/get-single-project';

@Controller('api/projects')
export class ProjectsController {

    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus
    ) { }

    @Get()
    async getProjects(): Promise<ProjectDto[]> {
        return await this.queryBus.execute(new GetAllProjectsQuery());
    }

    @Get(':id')
    async getProject(@Param('id') id: string): Promise<ProjectDto> {
        return await this.queryBus.execute(new GetSingleProjectQuery(id));
    }

    @Post()
    async createProject(@Body() form: CreateProjectForm): Promise<ProjectDto> {
        return await this.commandBus.execute(new CreateProjectCommand(form));
    }

    @Put(':projectId')
    async updateProject(
        @Param('projectId') projectId: string,
        @Body() form: CreateProjectForm): Promise<ProjectDto> {
        return await this.commandBus.execute(new UpdateProjectCommand(projectId, form))
    }
}