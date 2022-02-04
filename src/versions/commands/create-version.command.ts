import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Version } from "../version.schema";
import { CreateVersionForm } from "../versions.dtos";
import { VersionsService } from "../versions.service";

export class CreateVersionCommand {
    readonly form: CreateVersionForm;
    constructor(form: CreateVersionForm) {
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