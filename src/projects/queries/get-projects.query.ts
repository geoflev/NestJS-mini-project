import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project, ProjectDocument } from "../project.schema";

export class GetAllProjectsQuery { }

@QueryHandler(GetAllProjectsQuery)
export class GetProjectsQueryHandler implements IQueryHandler<GetAllProjectsQuery>{
    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) { }

    async execute(query: GetAllProjectsQuery): Promise<Project[]> {
        return this.projectModel.find().exec();
    }
}
