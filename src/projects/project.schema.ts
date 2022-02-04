import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Version } from "src/versions/version.schema";
import * as mongoose from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {

  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Version' })
  // versions: Version[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);