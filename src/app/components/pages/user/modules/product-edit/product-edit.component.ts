import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../../../models/Product';
import { ProductService } from '../../../../../services/product.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  @Input()
  public productId: string;

  public product: Product;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      if (products) {
        const product: Product[] = products.filter(
          (product) => product.id === this.productId
        );
        this.product = product[0];
        console.log(this.product);
      }
    });
  }
}
