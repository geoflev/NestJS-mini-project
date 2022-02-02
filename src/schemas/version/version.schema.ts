import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type VersionDocument = Version & Document;

@Schema()
export class Version {
    id: string;

    @Prop()
    versionName: string;

    @Prop()
    versionDesc: string;

}

export const VersionSchema = SchemaFactory.createForClass(Version);