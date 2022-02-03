import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ProjectDocument = Project & Document;

@Schema()
export class Project {

  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);