import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../models/Product';
import { ProductService } from '../../../../../services/product.service';
import {
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';
import {} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  public productForm: FormGroup = this.fb.group({
    title: ['Extended Warranty', Validators.required],
    description: ['Gets you 30 more years', Validators.required],
    cost: [30, Validators.required],
    image: ['https://picsum.photos/50'],
    video: ['v=t_MnFvXzcBM'],
  });

  get title() {
    return this.productForm.get('title');
  }
  get description() {
    return this.productForm.get('description');
  }
  get cost() {
    return this.productForm.get('cost');
  }
  get image() {
    return this.productForm.get('image');
  }
  get video() {
    return this.productForm.get('video');
  }

  public onSubmit(): void {
    this.productService.createProduct(this.productForm.getRawValue());
    console.log('On submit');
  }
}
