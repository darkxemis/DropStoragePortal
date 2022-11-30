import { ApiService } from "src/app/core/services/api.service";
import { ApiConstants } from "../constants/api.constants";
import { Injectable } from "@angular/core";
import { Guid } from "guid-typescript";
import { GetFileStorage } from "../models/file-storage/file-storage-get";

@Injectable()
export class FileStorageApiService {
    constructor(private apiService: ApiService)
    {}

    public async GetAllFilesByUserId(id_user: string): Promise<GetFileStorage[]> {
        return await this.apiService.get(ApiConstants.pathGetAllFiles, {idUser: id_user});
    }

    public async GetDownloadFile(ids: string[]): Promise<Blob> {
        return await this.apiService.getFile(ApiConstants.pathDownloadFile, ids);
    }
}