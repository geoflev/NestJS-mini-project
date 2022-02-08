import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';

export type VersionDocument = Version & Document;

@Schema()
export class Version {

    constructor(versionId: string, name: string, description: string){
        this.versionId = versionId;
        this.name = name;
        this.description = description;
    }

    @Prop()
    versionId: string;

    @Prop()
    name: string;

    @Prop()
    description: string;

}

export const VersionSchema = SchemaFactory.createForClass(Version);