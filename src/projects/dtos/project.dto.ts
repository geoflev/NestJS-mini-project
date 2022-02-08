import { VersionDto } from "src/versions/dtos/version.dto";

export class ProjectDto {
    name: string;
    description?: string;
    versions: VersionDto[];
}
