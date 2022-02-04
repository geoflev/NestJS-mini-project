import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './projects/projects.module';
import { VersionsModule } from './versions/versions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://geoflev:207920@cluster0.cj4iv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    ProjectsModule,
    VersionsModule
  ]
})
export class AppModule { }
