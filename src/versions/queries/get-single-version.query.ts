import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { VersionsService } from "../versions.service";

export class GetSingleVersionQuery implements IQuery {
    constructor(readonly id: string) { }
}

@QueryHandler(GetSingleVersionQuery)
export class GetSingleVersionQueryHandler implements IQueryHandler<GetSingleVersionQuery>{
    constructor(private readonly repo: VersionsService) { }

    execute(query: GetSingleVersionQuery): Promise<any> {
        return this.repo.findById(query.id);
    }
}