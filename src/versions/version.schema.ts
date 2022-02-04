import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type VersionDocument = Version & Document;

@Schema()
export class Version {
    id: string;

    @Prop()
    name: string;

    @Prop()
    description: string;
}

export const VersionSchema = SchemaFactory.createForClass(Version);