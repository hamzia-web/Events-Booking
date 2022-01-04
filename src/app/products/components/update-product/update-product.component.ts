import { Component, OnInit } from '@angular/core';
import {IProduct} from "../../models/IProduct";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {error} from "protractor";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  public productId: string = ''
  public selectedProduct: IProduct;
  private errorMessage: string;
  private emptyFields: boolean;

  constructor(private activatedRoute: ActivatedRoute, private productService:ProductService,
              private router: Router) { }

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.productId = param.get('id')
        console.log(`Product Id: ${this.productId}`)

      this.productService.getProduct(this.productId).subscribe((data) =>{
        this.selectedProduct = data
        console.log(`Data: ${data}`)
      } , (error) =>{
        this.errorMessage = error
      })
    })
  }

  /**
   * Select Product Image
   * @param event
   */
  public selectProductImage(event){
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      // /this.imageFileName = file;
      reader.addEventListener('load', () => {
        return reader.result ? this.selectedProduct.image = String(reader.result) : '';
      });
    }
  }

  /*
      Method is to submit form data for product creation
  */
  submitUpdateProduct(){
    console.log(`CreateProductComponent ---- submitCreateProduct()`)
    // JS form validations
    if(this.selectedProduct.name !== '' && this.selectedProduct.image !== '' && this.selectedProduct.price !== null &&
      this.selectedProduct.qty !== null && this.selectedProduct.info !== '')
    {
      this.productService.updateProducts(this.selectedProduct,this.productId).subscribe((data) =>{
        this.router.navigate(['/products/admin']).then(response => {
          console.log(`Response of then: ${response}`)
        })
      }, (error) => {
        this.errorMessage = error;
      })
    }
    else
    {
      this.emptyFields = true;
    }
  }
}
