import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
    name: string;
    description?: string;
}