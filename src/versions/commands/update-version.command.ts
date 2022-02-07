import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project, ProjectDocument } from "src/projects/project.schema";
import { UpdateVersionDto } from "../dtos/update-version.dto";
import { Version, VersionDocument } from "../version.schema";

export class UpdateVersionCommand {
    readonly projectId: string;
    readonly versionId: string;
    readonly form: UpdateVersionDto;
    constructor(projectId: string, versionId: string, form: UpdateVersionDto) {
        this.projectId = projectId;
        this.versionId = versionId;
        this.form = form;
    }
}

@CommandHandler(UpdateVersionCommand)
export class UpdateVersionCommandHandler implements ICommandHandler<UpdateVersionCommand>{
    constructor(
        @InjectModel(Version.name) private versionModel: Model<VersionDocument>,
        @InjectModel(Project.name) private projectModel: Model<ProjectDocument>
    ) { }

    async execute(command: UpdateVersionCommand): Promise<any> {
        const project = await this.projectModel.findOne({ id: command.projectId });
        // let version = project.versions.find(version => version.id === command.versionId);
        // version.name = command.form.name;
        // version.description = command.form.description;
        await this.versionModel.findByIdAndUpdate(
            { id: command.versionId },
            { name: command.form.name, description: command.form.description },
            { new: true })
        return project;
    }
}