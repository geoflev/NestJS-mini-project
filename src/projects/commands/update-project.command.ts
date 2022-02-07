import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdateProjectDto } from "../dtos/update-project.dto";
import { Project, ProjectDocument } from "../project.schema";
import { ProjectsService } from "../projects.service";

export class UpdateProjectCommand {
    readonly projectId: string;
    readonly form: UpdateProjectDto;
    constructor(projectId: string, form: UpdateProjectDto) {
        this.projectId = projectId;
        this.form = form;
    }
}

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectCommandHandler implements ICommandHandler<UpdateProjectCommand>{
    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) { }

    async execute(command: UpdateProjectCommand): Promise<Project> {
        try {
            return await this.projectModel.findByIdAndUpdate(
                command.projectId,
                {
                    name: command.form.name,
                    description: command.form.description
                },
                {
                    new: true
                });
        } catch {
            throw new NotFoundException('Project to be updated was not found!');
        }
    }
}