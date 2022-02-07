import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Project, ProjectDocument } from "../project.schema";
import { ProjectsService } from "../projects.service";

export class DeleteProjectCommand {
    readonly projectId: string;
    constructor(projectId: string) {
        this.projectId = projectId;
    }
}

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectCommandHandler implements ICommandHandler<DeleteProjectCommand>{
    constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) { }

    async execute(command: DeleteProjectCommand): Promise<void> {
        try {
            await this.projectModel.findByIdAndRemove(command.projectId);
        } catch {
            throw new NotFoundException('Project to be deleted was not found!')
        }
    }


}