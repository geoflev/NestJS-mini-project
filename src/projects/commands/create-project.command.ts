import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateProjectDto } from "../dtos/create-project.dto";
import { ProjectsService } from "../projects.service";

export class CreateProjectCommand {
    readonly form: CreateProjectDto;
    constructor(form: CreateProjectDto) {
        this.form = form;
    }
}

@CommandHandler(CreateProjectCommand)
export class CreateProjectCommandHandler implements ICommandHandler<CreateProjectCommand>{
    constructor(private readonly repo: ProjectsService) { }

    async execute(command: CreateProjectCommand): Promise<any> {
        const newProj = await this.repo.create(command.form);
        return newProj;
    }
}