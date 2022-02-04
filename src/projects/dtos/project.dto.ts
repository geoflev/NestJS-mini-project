import { VersionDto } from "src/versions/dtos/version.dto";

export class ProjectDto {
    id: string;
    name: string;
    description?: string;
    versions: VersionDto[];
}
