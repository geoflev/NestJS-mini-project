import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './project.schema';
import { CreateProjectForm, UpdateProjectForm } from './projects.dtos';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) { }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async create(createProjectForm: CreateProjectForm): Promise<Project> {
    const createdProj = new this.projectModel(createProjectForm);
    return createdProj.save();
  }

  async findById(id: string): Promise<Project> {
    return this.projectModel.findOne({ id });
  }

  async updateProject(id: string, updateForm: UpdateProjectForm): Promise<Project> {
    return this.projectModel.findByIdAndUpdate(id, { name: updateForm.name, description: updateForm.description }, {
      new: true
    });
  }

  async deleteProject(projectId: string): Promise<any> {
    return this.projectModel.findByIdAndRemove(projectId);
  }
}