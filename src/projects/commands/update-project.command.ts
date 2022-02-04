import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Project } from "../project.schema";
import { UpdateProjectForm } from "../projects.dtos";
import { ProjectsService } from "../projects.service";

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
    constructor(private readonly repo: ProjectsService) { }

    execute(command: UpdateProjectCommand): Promise<Project> {
        return this.repo.updateProject(command.projectId, command.form);
    }
}