import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateProjectDto } from "../dtos/update-project.dto";
import { Project } from "../project.schema";
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
    constructor(private readonly repo: ProjectsService) { }

    execute(command: UpdateProjectCommand): Promise<Project> {
        return this.repo.updateProject(command.projectId, command.form);
    }
}