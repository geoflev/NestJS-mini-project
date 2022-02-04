import { ICommandHandler, QueryHandler } from "@nestjs/cqrs";
import { Version } from "../version.schema";
import { VersionsService } from "../versions.service";

export class GetAllVersionsQuery { }

@QueryHandler(GetAllVersionsQuery)
export class GetAllVersionsQueryHandler implements ICommandHandler<GetAllVersionsQuery>{
    constructor(private readonly repo: VersionsService) { }

    async execute(command: GetAllVersionsQuery): Promise<Version[]> {
        return this.repo.findAll();
    }
}