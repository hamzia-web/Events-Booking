import { Component, OnInit } from '@angular/core';
import {IProduct} from "../../models/IProduct";
import {ProductService} from "../../services/product.service";
import {error} from "protractor";

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
 public products: IProduct[] = [];
 private errorMessage: string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) =>
    {
      this.products = data;
    }, (error) => {
      console.error(error)
      this.errorMessage = error
    })
  }

}
