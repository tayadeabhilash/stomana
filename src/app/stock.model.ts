export class Stock {
    name: string;
    buyPrice: number;
    sellPrice: number;
    quantity: number;
    dpCharges: number;
    tax: number;
    otherCharges: number;
    pl: number;
    color: string;
    constructor() {
        this.pl = this.sellPrice - this.buyPrice - this.dpCharges - this.tax - this.otherCharges;
        if (this.pl < 0){
            this.color = 'red';
        }
        else if (this.pl > 0){
            this.color = 'green';
        }
        else{
            this.color = 'white';
        }
    }
}
