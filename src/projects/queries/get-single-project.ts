import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProjectsService } from "../projects.service";

export class GetSingleProjectQuery implements IQuery {
    readonly id: string;
    readonly includeVersions: boolean;
    constructor(id: string, includeVersions: boolean

    ) {
        this.id = id;
        this.includeVersions = includeVersions;
    }
}

@QueryHandler(GetSingleProjectQuery)
export class GetSingleProjectHandler implements IQueryHandler<GetSingleProjectQuery>{

    constructor(private readonly repo: ProjectsService) { }

    async execute(query: GetSingleProjectQuery): Promise<any> {
        return this.repo.findById(query.id, query.includeVersions);
    }


}