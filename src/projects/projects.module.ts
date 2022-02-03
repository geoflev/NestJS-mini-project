import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers } from './commands';
import { Project, ProjectSchema } from './project.schema';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { QueryHandlers } from './queries';
import { GetProjectsQueryHandler } from './queries/get-projects.query';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    CqrsModule
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    ...QueryHandlers,
    ...CommandHandlers
  ]
})
export class ProjectsModule { }
