import { Component, OnInit } from '@angular/core';
import {IProduct} from "../../models/IProduct";
import {ProductService} from "../../services/product.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public products: IProduct[] = []
  public errorMessage:string = ''
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    },(error) => {
      console.log(error)
        this.errorMessage = error;
    })
  }

  changeDeleteProduct(productId){
    console.log(`AdminComponent--changeDeleteProduct(), ${productId}`)
    this.productService.deleteProduct(productId).subscribe((data) =>{
      console.log(`Deleted Product: ${productId}`)
      this.productService.getAllProducts().subscribe((data) => {
        console.log(`Products: ${data}`)
        this.products = data;
      },(error) => {
        console.log(error)
        this.errorMessage = error;
      })
    }, (error) =>{
      console.log(error)
      this.errorMessage = error
    })
  }
}
