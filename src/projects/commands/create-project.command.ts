import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateProjectForm } from "../projects.dtos";
import { ProjectsService } from "../projects.service";

export class CreateProjectCommand {
    readonly form: CreateProjectForm;
    constructor(form: CreateProjectForm) {
        this.form = form;
    }
}

@CommandHandler(CreateProjectCommand)
export class GetProjectsCommandHandler implements ICommandHandler<CreateProjectCommand>{
    
    constructor(private readonly repo: ProjectsService){}
    
    async execute(command: CreateProjectCommand): Promise<any> {
        const newProj = await this.repo.create(command.form);
        return newProj;
    }
}