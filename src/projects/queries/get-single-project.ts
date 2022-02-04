import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProjectsService } from "../projects.service";

export class GetSingleProjectQuery implements IQuery {
    constructor(readonly id: string) { }
}

@QueryHandler(GetSingleProjectQuery)
export class GetSingleProjectHandler implements IQueryHandler<GetSingleProjectQuery>{

    constructor(private readonly repo: ProjectsService) { }

    async execute(query: GetSingleProjectQuery): Promise<any> {
        return this.repo.findById(query.id);
    }


}