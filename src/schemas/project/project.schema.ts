import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Version } from "../version/version.schema";

export type ProjectDocument = Project & Document;

@Schema()
export class Project {

    id: string;

    @Prop()
    projectName: string;

    @Prop()
    projectDesc: string;

    @Prop()
    version: Version[];

}

export const ProjectSchema = SchemaFactory.createForClass(Project);