import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { AuthService } from '../../../../services/auth.service';
import { Product } from '../../../../models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products: Product[];
  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      console.log('IS Auth', user);

      if (user) {
        this.productService.getProducts().subscribe((products) => {
          console.log(products);

          if (products) {
            this.products = products;
          }
        });
      }
    });
  }
}
