export interface VersionDto {
    id: string;
    name: string;
    description?: string;
}

export interface CreateVersionForm{
    name: string;
    description: string;
}

export interface UpdateVersionForm{
    name: string;
    description: string;
}