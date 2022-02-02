import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { Version } from '../version/version.schema';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) { }

    async insertProject(createProjectDto: CreateProjectDto): Promise<Project> {
        const createdProj = new this.projectModel(createProjectDto);
        return await createdProj.save();
    }

    async getAllProjects(): Promise<Project[]> {
        const projects = await this.projectModel.find().exec();
        return projects.map(project => ({
            id: project.id,
            projectName: project.projectName,
            projectDesc: project.projectDesc,
            version: [
                new Version(),
            ]
        }));
    }

    async getSingleProject(projectId: string) {
        const project = await this.findProject(projectId);
        return project;
    }

    async updateProject(createProjectDto: CreateProjectDto): Promise<void>{
        const project = await this.projectModel.findById(createProjectDto.id);
        if(!project){
            throw new NotFoundException('Project could not be found');
        }
        await this.projectModel.updateOne({projectName: createProjectDto.projectName, projectDesc: createProjectDto.projectDesc})
    }

    async deleteProject(projectId: string): Promise<void>{
        const project = await this.projectModel.findById(projectId);
        if(!project){
            throw new NotFoundException('Project could not be found');
        }
        await this.projectModel.deleteOne({_id :projectId});
    }
    
    private async findProject(id: string): Promise<Project> {
        const project = await this.projectModel.findById(id);
        if(!project){
            throw new NotFoundException('Could not find project');
        }
        return {id: project.id, projectName: project.projectName, projectDesc: project.projectDesc, version: project.version};
        
    }
}