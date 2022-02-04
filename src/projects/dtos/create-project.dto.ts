import { ApiProperty } from '@nestjs/swagger';
import { Version } from 'src/versions/version.schema';

export class CreateProjectDto {
    @ApiProperty({
        example: 'Project Name',
        description: 'The project name'
    })
    name: string;

    @ApiProperty({
        example: 'Project Desc',
        description: 'The project description'
    })
    description?: string;

    versions: Version[];
}