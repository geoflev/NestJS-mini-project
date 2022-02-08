import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project, ProjectDocument } from "src/projects/project.schema";
import { CreateVersionDto } from "../dtos/create-version.dto";
import { Version, VersionDocument } from "../version.schema";
import { v4 as uuidv4 } from 'uuid';

export class CreateVersionCommand {
    readonly form: CreateVersionDto;
    readonly projectId: string;
    constructor(form: CreateVersionDto, projectId: string) {
        this.form = form;
        this.projectId = projectId;
    }
}

@CommandHandler(CreateVersionCommand)
export class CreateVersionCommandHandler implements ICommandHandler<CreateVersionCommand>{
    constructor(
        @InjectModel(Version.name) private versionModel: Model<VersionDocument>,
        @InjectModel(Project.name) private projectModel: Model<ProjectDocument>
    ) { }

    async execute(command: CreateVersionCommand): Promise<Project> {
        const project = await this.projectModel.findById(command.projectId);
        const version = await this.versionModel.create(new Version( uuidv4(), command.form.name, command.form.description))
        project.versions.push(version)
        project.save();
        return project;
    }


}