import { ApiProperty } from '@nestjs/swagger';

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
}