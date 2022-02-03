import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://geoflev:207920@cluster0.cj4iv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    ProjectsModule
  ]
})
export class AppModule { }
