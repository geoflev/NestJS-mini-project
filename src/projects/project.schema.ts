import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {

  id: string;

  @ApiProperty({
    example: 'Project Name',
    description: 'The project name'
  })
  @Prop()
  name: string;

  @ApiProperty({
    example: 'Project Description',
    description: 'The project description'
  })
  @Prop()
  description: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);