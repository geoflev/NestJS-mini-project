import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './project.schema';
import { CreateProjectForm } from './projects.dtos';


@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

  async create(createProjectForm: CreateProjectForm): Promise<Project> {
    const createdProj = new this.projectModel(createProjectForm);
    return createdProj.save();
  }

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async findById(id: string): Promise<Project> {
    return this.projectModel.findOne({id});
  }
}