import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongooseModule } from "@nestjs/mongoose";
import { Project, ProjectSchema } from "src/projects/project.schema";
import { CommandHandlers } from "./commands";
import { QueryHandlers } from "./queries";
import { Version, VersionSchema } from "./version.schema";
import { VersionsController } from "./versions.controller";
import { VersionsService } from "./versions.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Project.name, schema: ProjectSchema }, 
            { name: Version.name, schema: VersionSchema }
        ]),
        CqrsModule
    ],
    controllers: [VersionsController],
    providers: [
        VersionsService,
        ...QueryHandlers,
        ...CommandHandlers
    ]
})
export class VersionsModule { }