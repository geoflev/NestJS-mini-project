import {Module, Version} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { VersionSchema } from './version.schema';
import { VersionsController } from './versions.controller';
import { VersionsService } from './versions.service';

@Module({
    imports: [MongooseModule.forFeature([{name: Version.name, schema: VersionSchema}])],
    controllers: [VersionsController],
    providers: [VersionsService],
})

export class VersionsModule{}