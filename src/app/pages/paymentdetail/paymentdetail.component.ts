import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/InterfaceUser';
import { PaymentDetailsService } from 'src/app/payment-details.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetailPost, PaymentDetailPut } from 'src/app/payment-details-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidateDate } from 'src/app/mm.yy.validator';

@Component({
  selector: 'app-paymentdetail',
  templateUrl: './paymentdetail.component.html',
  styleUrls: ['./paymentdetail.component.css']
})
export class PaymentdetailComponent implements OnInit {

  signUser : User = {
    email : 'user5@example.com',
    password : 'String123!@#'
  };
  //show result
  result : PaymentDetailPut[] = [];

  PDPost: PaymentDetailPost = {
    cardOwnerName:"",
    cardNumber: "",
    expirationDate: "",
    securityCode: ""
  }
  
  PDPut: PaymentDetailPut = {
    paymentDetailId : 0,
    cardOwnerName:"",
    cardNumber: "",
    expirationDate: "",
    securityCode: ""   
  }


  PDForm = new FormGroup({
    paymentDetailId: new FormControl(''),
    cardOwnerName: new FormControl('', [Validators.required]),
    cardNumber: new FormControl('',[Validators.required]),
    expirationDate: new FormControl('',[Validators.required,ValidateDate]),
    securityCode: new FormControl('',[Validators.required])
  })


  post(){
      console.log("functionpostcalled");
    console.log(this.PDForm);
    if(!this.PDForm.invalid){
      if(!this.PDForm.value.paymentDetailId){
        this.PDPost = {
          cardOwnerName: this.PDForm.value.cardOwnerName,
          cardNumber : this.PDForm.value.cardNumber,
          expirationDate : this.PDForm.value.expirationDate,
          securityCode : this.PDForm.value.securityCode
        }
          this.paymentDetailsService.postPD(this.PDPost).subscribe((res)=>{
           console.log(JSON.stringify(res));
           this.toastr.success('Payment Detail Post Success!');
           this.resetForm();
           this.refreshlist();
        }); 
      } else {
        this.PDPut = {
          paymentDetailId: this.PDForm.value.paymentDetailId,
          cardOwnerName: this.PDForm.value.cardOwnerName,
          cardNumber : this.PDForm.value.cardNumber,
          expirationDate : this.PDForm.value.expirationDate,
          securityCode : this.PDForm.value.securityCode
        }
          this.paymentDetailsService.putPD(this.PDPut,this.PDForm.value.paymentDetailId).subscribe((res)=>{
            console.log(JSON.stringify(res));
            this.toastr.success('Payment Detail Update Success!');
            this.resetForm();
            this.refreshlist();
         }); 
      }
      
    } else {
      this.toastr.error('Invalid input');
    }
  }
   removePD(id: any){
     console.log(id);
     this.paymentDetailsService.delPD(id).subscribe((res)=>{
       this.toastr.error('Deleted Successfully');
       this.refreshlist();
     })
   }
  refreshlist(){
    this.paymentDetailsService.getPD().subscribe((res)=>{
      this.result = res;
      console.log(this.result[0].paymentDetailId)
    });
  }
  populatePD(list:PaymentDetailPut){
    console.log(JSON.stringify(list));
    
    this.PDForm.setValue({
      paymentDetailId: list.paymentDetailId,  
      cardOwnerName: list.cardOwnerName,
      cardNumber : list.cardNumber,
      expirationDate : list.expirationDate,
      securityCode : list.securityCode
    })
    console.log(this.PDForm.value.paymentDetailId);
  }
  resetForm(){
    this.PDForm.reset();
    this.PDForm.patchValue({paymentDetailId : ''});
  }
  constructor(public paymentDetailsService : PaymentDetailsService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.refreshlist();
  }

}
