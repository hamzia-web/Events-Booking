import { Component, OnInit } from '@angular/core';
import {IProduct} from "../../models/IProduct";
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  public product: IProduct = {
     _id : '',
    name : '',
    image: '',
    price: null,
    qty : null,
    info: ''
  };
  public imageFileName:any;
  private errorMessage: string;
  public emptyFields: boolean
  constructor(private productService: ProductService, private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  /*
      Method is to submit form data for product creation
  */
  submitCreateProduct(){
    // JS form validations
    if(this.product.name !== '' && this.product.image !== '' && this.product.price !== null &&
      this.product.qty !== null && this.product.info !== '')
    {
      this.productService.createAProducts(this.product).subscribe((data) =>{
        this.router.navigate(['/products/admin']).then(response => {
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

  /**
   * Select Product Image
   * @param event
   */
  public selectProductImage(event){
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      this.imageFileName = file;
      reader.addEventListener('load', () => {
        return reader.result ? this.product.image = String(reader.result) : '';
      });
    }
  }

  /**
   * Reactive Form validation
   */
  public createProductForm = this.formBuilder.group({
    name: [''],
    image: [''],
    price: [''],
    qty: [''],
    info: ['']
  })
}
