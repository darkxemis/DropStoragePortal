import { Injectable } from "@angular/core";
import { ApiService } from "src/app/core/services/api.service";
import { ApiConstants } from "../constants/api.constants";
import { CreateShareLink } from "../models/ShareLink/share-link-create";
import { GetShareLink } from "../models/ShareLink/share-link-get";

@Injectable()
export class ShareLinkApiService {
    constructor(private apiService: ApiService)
    {}

    public async CreateShareLink(CreateShareLink: CreateShareLink): Promise<GetShareLink> {
        return await this.apiService.post(ApiConstants.pathPostShareLink, CreateShareLink);
    }

    public async DownloadShareLink(idShareLink: string): Promise<Blob> {
        return await this.apiService.getFile(ApiConstants.pathDownloadShareLink, {idShareLink: idShareLink});
    }
}