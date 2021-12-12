export class Van {
    constructor(
        public vehicleNo?: string,
        public model?: string,
        public capacity?: string,
        public ac?: boolean,
        public make?: string,
        public fuelType?: string,
        public year?: string,
        public stdCategory?:string,
        public numOfStds?:string
    ) { }

}

export class Route {
    constructor(public _id: String = "",
        public name: String = "route1",
        public description: String = "Faizabad to Comsats") { }
}


export class Fee {
    constructor(public _id: String = "",
        public dueAmount: String = "30,000",
        public dueDate: String = "30-July-2021",
        public paidAmount: String = "0") { }
}

export class Driver {
    constructor
        (
            public fullName?: string,
            public email?: string,
            public phone_No?: string,
            public age?: string,
            public gender?: string,
            public haddress?: string,
            public password?:string
    ) { }
}

export class Student {
    constructor
        (
            public fullName: string = "",
            public email: string = "",
            public phone_No: string = "",
            public password: string = "",
            public iaddress: string = "",
            public haddress: string = "",
            public age: string = "",
            public gender: string = "",


    ) { }
}


export class Parent {
    constructor
        (
            public _id: String = "",
            public fullname: String = "",
            public email: String = "",
            public phone_no: String = "",
            public password: String = "",
            public role: String = "Parent",
            public homeAddress: String = "",

    ) { }
}

export class Complaint {
    constructor
        (
            public date: string = "",
            public title: string = "",
            public description: string = "",
            public status: string = "",
            public feedback: string = "",
            public userClass:string="",
            public userPhone_No:string=""
    ) { }
}