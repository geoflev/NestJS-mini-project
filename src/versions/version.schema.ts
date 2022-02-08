import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';

export type VersionDocument = Version & Document;

@Schema()
export class Version {

    constructor(name: string, description: string){
        this.name = name;
        this.description = description;
    }

    @Prop()
    name: string;

    @Prop()
    description: string;

}

export const VersionSchema = SchemaFactory.createForClass(Version);