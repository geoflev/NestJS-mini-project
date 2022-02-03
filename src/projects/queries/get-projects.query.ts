import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProjectsService } from "../projects.service";

export class GetAllProjectsQuery {
}

@QueryHandler(GetAllProjectsQuery)
export class GetProjectsQueryHandler implements IQueryHandler<GetAllProjectsQuery>{
    constructor(private readonly repo: ProjectsService){}
    
    async execute(query: GetAllProjectsQuery): Promise<any> {
        return this.repo.findAll();
    }
}
