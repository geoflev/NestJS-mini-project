import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers } from './commands';
import { Project, ProjectSchema } from './project.schema';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { QueryHandlers } from './queries';

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
