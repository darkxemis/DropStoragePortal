import { ApiService } from "src/app/core/services/api.service";
import { ApiConstants } from "../constants/api.constants";
import { Injectable } from "@angular/core";
import { GetFileStorage } from "../models/file-storage/file-storage-get";
import { UserService } from "src/app/core/services/user.service";
import { TokenParsed } from "src/app/core/models/tokenParse.model";
import { User } from "src/app/core/models/user.model";
import { ResetPassword } from "../models/user/ResetPassword";

@Injectable()
export class UserApiService {
    constructor(private apiService: ApiService, private userService: UserService,)
    {}

    public async GetUserByUserName(): Promise<User> {
        const tokenParsed: TokenParsed = this.userService.getCurrentTokenParse();
        return await this.apiService.get(ApiConstants.pathGetUser, {userName: tokenParsed.name});
    }

    public async ResetPasswordEmail(userEmail: string): Promise<boolean> {
        return await this.apiService.post(ApiConstants.pathResetPasswordEmail, {email: userEmail});
    }

    public async ResetPassword(resetPassword: ResetPassword): Promise<boolean> {
        return await this.apiService.post(ApiConstants.pathResetPassword, resetPassword);
    }
}