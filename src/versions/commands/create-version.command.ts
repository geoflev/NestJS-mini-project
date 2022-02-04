import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateVersionDto } from "../dtos/create-version.dto";
import { Version } from "../version.schema";
import { VersionsService } from "../versions.service";

export class CreateVersionCommand {
    readonly form: CreateVersionDto;
    constructor(form: CreateVersionDto) {
        this.form = form;
    }
}

@CommandHandler(CreateVersionCommand)
export class CreateVersionCommandHandler implements ICommandHandler<CreateVersionCommand>{
    constructor(private readonly repo: VersionsService) { }

    execute(command: CreateVersionCommand): Promise<Version> {
        return this.repo.createVersion(command.form);
    }


}