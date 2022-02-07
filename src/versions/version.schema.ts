import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { randomUUID } from "crypto";

export type VersionDocument = Version & Document;

@Schema()
export class Version {

    constructor(name: string, description: string){
        this.id = randomUUID();
        this.name = name;
        this.description = description;
    }

    id: string;

    @Prop()
    name: string;

    @Prop()
    description: string;
}

export const VersionSchema = SchemaFactory.createForClass(Version);