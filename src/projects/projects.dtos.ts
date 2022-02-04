import { Version } from "src/versions/version.schema";

export interface ProjectDto {
    id: string;
    name: string;
    description?: string;
    versions: VersionDto[];
}

export interface VersionDto {
    id: string;
    name: string;
    description?: string;
}

export interface CreateProjectForm {
    name: string;
    description?: string;
    versions: Version[];
}

export interface UpdateProjectForm {
    name: string;
    description?: string;
}