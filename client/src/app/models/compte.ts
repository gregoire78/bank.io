export class Compte{
    constructor(
        public _id:any,
        public name:String,
        public user:any,
        public mouvements?:Mouvement,
    ){}
}

export class Mouvement{
    constructor(
        public title:String, 
        public price:Number, 
        public date?:Date
    ){}
}