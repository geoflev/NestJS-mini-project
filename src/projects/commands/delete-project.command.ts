import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ProjectsService } from "../projects.service";

export class DeleteProjectCommand {
    readonly projectId: string;
    constructor(projectId: string) {
        this.projectId = projectId;
    }
}

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectCommandHandler implements ICommandHandler<DeleteProjectCommand>{
    constructor(private readonly repo: ProjectsService) { }

    execute(command: DeleteProjectCommand): Promise<any> {
        return this.repo.deleteProject(command.projectId);
    }


}