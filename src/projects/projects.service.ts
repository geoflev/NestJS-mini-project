import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './project.schema';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) { }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async create(createProjectForm: CreateProjectDto): Promise<Project> {
    const createdProj = new this.projectModel(createProjectForm);

    return createdProj.save();
  }

  async findById(id: string, includeVersions: boolean): Promise<Project> {
    const project = await this.projectModel.findOne({ id });
    if (!includeVersions) {
      const projectDest = {
        id: project.id, 
        projectId: project.projectId, 
        name: project.name, 
        description: project.description, 
        versions: includeVersions
          ? project.versions
          : []
      };
      return projectDest;
    }

    return project;
  }

  async updateProject(id: string, updateForm: UpdateProjectDto): Promise<Project> {
    try {
      return await this.projectModel.findByIdAndUpdate(
        id,
        {
          name: updateForm.name,
          description: updateForm.description
        },
        {
          new: true
        });
    } catch {
      throw new NotFoundException('Project to be updated was not found!')
    }
  }

  async deleteProject(projectId: string): Promise<void> {
    try {
      await this.projectModel.findByIdAndRemove(projectId);
    } catch {
      throw new NotFoundException('Project to be deleted was not found!')
    }
  }
}