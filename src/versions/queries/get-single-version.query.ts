import { NotFoundException } from "@nestjs/common";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project, ProjectDocument } from "src/projects/project.schema";
import { Version, VersionDocument } from "../version.schema";

export class GetSingleVersionQuery implements IQuery {
    constructor(
        readonly projectId: string,
        readonly versionId: string
    ) { }
}

@QueryHandler(GetSingleVersionQuery)
export class GetSingleVersionQueryHandler implements IQueryHandler<GetSingleVersionQuery>{
    constructor(
        @InjectModel(Version.name) private versionModel: Model<VersionDocument>,
        @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    ) { }

    async execute(query: GetSingleVersionQuery): Promise<Version> {
        const project = await this.projectModel.findById(query.projectId);
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        const version = await this.versionModel.findById(query.versionId);
        if (!version) {
            throw new NotFoundException('Version was not found');
        }
        return version;
    }
}