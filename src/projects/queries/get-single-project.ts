import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project, ProjectDocument } from "../project.schema";

export class GetSingleProjectQuery implements IQuery {
    readonly id: string;
    readonly includeVersions: boolean;
    constructor(id: string, includeVersions: boolean
    ) {
        this.id = id;
        this.includeVersions = includeVersions;
    }
}

@QueryHandler(GetSingleProjectQuery)
export class GetSingleProjectHandler implements IQueryHandler<GetSingleProjectQuery>{

    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) { }

    async execute(query: GetSingleProjectQuery): Promise<Project> {
        const project = await this.projectModel.findOne({ id: query.id });
        if (!query.includeVersions) {
            const projectDest = { id: project.id, name: project.name, description: project.description };
            return projectDest;
        }

        return project.populate('versions');
    }


}