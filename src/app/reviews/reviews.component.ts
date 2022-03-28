import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup}from '@angular/forms'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { reviewModel } from './reviews model';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  
  formValue! :FormGroup;
  reviewsModelObj:reviewModel=new reviewModel();
  reviewsData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder :FormBuilder,
    private api:ApiService ) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      name:[''],
      place:[''],
      comment:[''],
    })
    this.getAllReview();
  }
  clickAddReview(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;

  }
  postReviewDetails(){
    this.reviewsModelObj.name=this.formValue.value.name;
    this.reviewsModelObj.place=this.formValue.value.place;
    this.reviewsModelObj.comment=this.formValue.value.comment;
    
    this.api.postReview(this.reviewsModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Review Added");
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllReview();
      
    },
    err=>{
      alert("went Wrong")
    })
  }


  getAllReview(){
    this.api.getReview()
    .subscribe(res=>{
      this.reviewsData=res;
    })
  }

 deleteReview(row:any){
   this.api.deleteReview(row.id)
   .subscribe(res=>{
     alert("Review deleted")
     this.getAllReview();
   })
 }
   onEdit(row:any){

    this.showAdd=false;
    this.showUpdate=true;
     this.reviewsModelObj.id=row.id;
     this.formValue.controls['name'].setValue(row.name);
     this.formValue.controls['place'].setValue(row.place);
     this.formValue.controls['comment'].setValue(row.comment);
   }

   updateReviewDetails(){
    this.reviewsModelObj.name=this.formValue.value.name;
    this.reviewsModelObj.place=this.formValue.value.place;
    this.reviewsModelObj.comment=this.formValue.value.comment;
     
    this.api.UpdateReview(this.reviewsModelObj,this.reviewsModelObj.id)
    .subscribe(res=>{
      alert('Updated sucessfully');
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllReview();
      
    })

    
   }
}
