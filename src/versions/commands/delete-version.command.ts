import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { VersionsService } from "../versions.service";

export class DeleteVersionCommand {
    readonly versionId: string;
    constructor(versionId: string) {
        this.versionId = versionId;
    }
}

@CommandHandler(DeleteVersionCommand)
export class DeleteVersionCommandHandler implements ICommandHandler<DeleteVersionCommand>{
    constructor(private readonly repo: VersionsService) { }

    execute(command: DeleteVersionCommand): Promise<void> {
        return this.repo.deleteVersion(command.versionId);
    }

}