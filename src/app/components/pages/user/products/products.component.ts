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
  public displayCreate: boolean;
  public productId: string;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {
    this.displayCreate = false;
  }

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

  public toggleCreate(): void {
    this.displayCreate = !this.displayCreate;
    console.log(this.displayCreate);
  }

  public onDelete(id: string): void {
    this.productService.deleteProduct(id);
  }

  public openEdit(id: string): void {
    this.productId = id;
  }

  public closeEdit(): void {
    this.productId = null;
  }
}
