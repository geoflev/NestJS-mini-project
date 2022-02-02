import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Version, VersionDocument } from './version.schema';
import { CreateVersionDto } from './dto/create-version.dto';

@Injectable()
export class VersionsService {
    constructor(@InjectModel(Version.name) private versionModel: Model<VersionDocument>) { }

    async insertVersion(createVersionDto: CreateVersionDto): Promise<Version> {
        const createdVersion = new this.versionModel(createVersionDto);
        return await createdVersion.save();
    }

    async getAllVersions(): Promise<Version[]> {
        const versions = await this.versionModel.find().exec();
        return versions.map(version => ({
            id: version.id,
            versionName: version.versionName,
            versionDesc: version.versionDesc,
        }));
    }

    async getSingleVersion(versionId: string) {
        const version = await this.findVersion(versionId);
        return version;
    }

    async updateVersion(createVersionDto: CreateVersionDto): Promise<void> {
        const version = await this.versionModel.findById(createVersionDto.id);
        if (!version) {
            throw new NotFoundException('Version could not be found');
        }
        await this.versionModel.updateOne({ versionName: createVersionDto.versionName, versionDesc: createVersionDto.versionDesc })
    }

    async deleteVersion(versionId: string): Promise<void> {
        const version = await this.versionModel.findById(versionId);
        if (!version) {
            throw new NotFoundException('Version could not be found');
        }
        await this.versionModel.deleteOne({ _id: versionId });
    }

    private async findVersion(id: string): Promise<Version> {
        const version = await this.versionModel.findById(id);
        if (!version) {
            throw new NotFoundException('Could not find version');
        }
        return {id: version.id, versionName: version.versionName, versionDesc: version.versionDesc};
    }
}