import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Version, VersionDocument } from "./version.schema";
import { CreateVersionForm, UpdateVersionForm } from "./versions.dtos";

@Injectable()
export class VersionsService {
    constructor(@InjectModel(Version.name) private versionModel: Model<VersionDocument>) {}

    async findAll(): Promise<Version[]> {
        return this.versionModel.find().exec();
    }

    async findById(id: string): Promise<Version> {
        return this.versionModel.findOne({ id })
    }

    async createVersion(form: CreateVersionForm): Promise<Version> {
        const createdVersion = new this.versionModel(form);
        return createdVersion.save();
    }

    async updateVersion(versionId: string, form: UpdateVersionForm) {
        return this.versionModel.findByIdAndUpdate(versionId, { name: form.name, description: form.description }, { new: true })
    }

    async deleteVersion(versionId: string): Promise<any> {
        return this.versionModel.findByIdAndRemove(versionId);
    }

}