export interface VacationModel {
    vacationID: number;
    destination:string;
    description:string;
    startDate: Date;
    endDate:Date;
    price:number;
    image:number;
    count:number;
    user_checked: string
}

export interface ResVacations {
    rows: [VacationModel],
    rows_all:number
}