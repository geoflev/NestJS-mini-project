import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './project.schema';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {

    constructor(private readonly projectService: ProjectsService) { }

    @Post()
    async addProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
        const proj = await this.projectService.insertProject(createProjectDto);
        return proj;
    }

    @Get()
    async getAllProjects() {
        return await this.projectService.getAllProjects();
    }

    @Get('/:id')
    async getSingleProject(@Param('id') projectId: string) {
        return await this.projectService.getSingleProject(projectId);
    }

    @Delete('/:id')
    async deleteProject(@Param('id') projectId: string) {
        return await this.projectService.deleteProject(projectId);
    }

    @Patch()
    async updateProject(@Body() createProjectDto: CreateProjectDto) {
        return await this.projectService.updateProject(createProjectDto);
    }
}