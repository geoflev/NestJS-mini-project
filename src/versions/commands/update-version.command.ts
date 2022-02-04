import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateVersionDto } from "../dtos/update-version.dto";
import { VersionsService } from "../versions.service";

export class UpdateVersionCommand {
    readonly versionId: string;
    readonly form: UpdateVersionDto;
    constructor(versionId: string, form: UpdateVersionDto) {
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