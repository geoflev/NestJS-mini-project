import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project, ProjectDocument } from "src/projects/project.schema";
import { Version, VersionDocument } from "../version.schema";

export class DeleteVersionCommand {
    constructor(
        readonly projectId: string,
        readonly versionId: string
    ) {
        this.projectId = projectId;
        this.versionId = versionId;
    }
}

@CommandHandler(DeleteVersionCommand)
export class DeleteVersionCommandHandler implements ICommandHandler<DeleteVersionCommand>{
    constructor(
        @InjectModel(Version.name) private versionModel: Model<VersionDocument>,
        @InjectModel(Project.name) private projectModel: Model<ProjectDocument>
    ) { }

    async execute(command: DeleteVersionCommand): Promise<void> {
        const project = await this.projectModel.findById(command.projectId).populate('versions');
        if (!project) {
            throw new NotFoundException('Project was not found')
        }

        const version = this.versionModel.findById(command.versionId)
        await this.versionModel.remove(command.versionId);

    }
}