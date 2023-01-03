export class ApiConstants {
    // url
    //public static url: string = AppConfig.settings.webApi.url;

    // paths
    public static pathAuthToken: string = '/auth/token';
    public static pathAuthRefreshToken: string = '/auth/refresh';

    //User
    public static pathGetUser: string = '/auth/user';
    public static pathResetPasswordEmail: string = '/user/resetpasswordemail';
    public static pathResetPassword: string = '/user/resetpassword';
    public static pathImgUser: string = '/user/getImg';
    public static pathUploadImg: string = '/user/uploadimg';
    
    //FileStorage
    public static pathGetAllFiles: string = '/auth/getallfiles';
    public static pathDownloadFile: string = '/auth/downloadfile';
    public static pathUploadFile: string = '/auth/uploadfiles';
    public static pathGetImg: string = '/auth/getImg';
    public static pathDeleteFiles: string = '/auth/deletefiles';

    //ShareLink
    public static pathPostShareLink: string = '/auth/createsharelink';
    public static pathDownloadShareLink: string = '/public/downloadsharedfile';
}