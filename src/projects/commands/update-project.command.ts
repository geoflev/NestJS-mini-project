import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateProjectForm } from "../projects.dtos";

export class UpdateProjectCommand {
    readonly projectId: string;
    readonly form: UpdateProjectForm;
    constructor(projectId: string, form: UpdateProjectForm) {
        this.projectId = projectId;
        this.form = form;
    }
}

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectCommandHandler implements ICommandHandler<UpdateProjectCommand>{
    execute(command: UpdateProjectCommand): Promise<any> {
        throw new Error("Method not implemented.");
    }
}