import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateVersionForm } from "../versions.dtos";
import { VersionsService } from "../versions.service";

export class UpdateVersionCommand {
    readonly versionId: string;
    readonly form: UpdateVersionForm;
    constructor(versionId: string, form: UpdateVersionForm) {
        this.versionId = versionId;
        this.form = form;
    }
}

@CommandHandler(UpdateVersionCommand)
export class UpdateVersionCommandHandler implements ICommandHandler<UpdateVersionCommand>{
    constructor(private readonly repo: VersionsService) { }

    execute(command: UpdateVersionCommand): Promise<any> {
        return this.repo.updateVersion(command.versionId, command.form);
    }

}