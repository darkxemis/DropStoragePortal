import * as moment from "moment";

export default class FormatDate {
    public static readonly format = "DD/MM/yyyy"; 
    public static readonly format2 = "DD/MM/yyyy HH:mm:ss"; 

    public static FormatDate(date: Date, format: string) : string
    {
        return moment(date).format(format).toString();
    }

    public static ConvertToDate(date: string, format: string): Date 
    {
        return moment(date, 'DD/MM/yyyy HH:mm:ss').toDate();
    }
}