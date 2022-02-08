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
        //get version object
        const versionT = await this.versionModel.findById(command.versionId);
        //delete it from its db
        //with custom id trim it from projects array of versions
        const newVersions = project.versions.filter(version => version.versionId !== versionT.versionId);
        project.versions = [...newVersions];

        await this.versionModel.findOneAndDelete({id: versionT.id});
        //version.save()
        project.save();
    }
}