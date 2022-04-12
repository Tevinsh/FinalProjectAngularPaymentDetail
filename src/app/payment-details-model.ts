export class PaymentDetailPost {
    cardOwnerName: string = '';
    cardNumber: string = '';
    expirationDate: string = '';
    securityCode: string = '';
}

export class PaymentDetailPut {
    paymentDetailId: number = 0;
    cardOwnerName: string = '';
    cardNumber: string = '';
    expirationDate: string = '';
    securityCode: string = '';
}