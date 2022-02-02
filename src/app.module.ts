import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsModule } from './schemas/project/projects.module';
import { VersionsModule } from './schemas/version/versions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://geoflev:207920@cluster0.cj4iv.mongodb.net/newNeuroDb?retryWrites=true&w=majority'),
    ProjectsModule,
    VersionsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
