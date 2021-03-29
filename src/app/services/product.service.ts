import { getProduct, getProducts, createProduct } from './../models/Queries';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { MessagingService } from './messaging.service';
import { AuthService, authHelpers } from './auth.service';
import { Product } from '../models/product';
import { User } from '../models/user';
import * as query from '../models/Queries';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: BehaviorSubject<Product[]>;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private messagingService: MessagingService,
    private authService: AuthService
  ) {
    this.products = new BehaviorSubject<Product[]>(null);
  }

  public getProducts(): Observable<Product[]> {
    if (this.products.value === null) {
      this.queryProducts();
    }
    return this.products;
  }

  public setProducts(product: Product[]): void {
    this.products.next(product);
  }
  // public setProduct(product: Product): void {
  //   this.product.next(product);
  //   console.log(this.product);
  // }

  public createProduct(product: Product): void {
    this.messagingService.setLoadingSmall(true);
    type data = {
      createProduct: Product[];
    };

    this.apollo
      .mutate<data>({
        mutation: query.createProduct,
        context: {
          headers: new HttpHeaders().set('x-token', authHelpers.getUserToken()),
        },
        variables: {
          ...product,
        },
      })
      .subscribe(
        ({ data }) => {
          this.messagingService.setLoadingSmall(false);
          if (data) {
            this.setProducts(data.createProduct);
          }
        },
        (error) => {
          // Stop loading
          this.messagingService.setLoadingSmall(false);
          console.log('there was an error sending the query', error.message);
        }
      );
  }

  public deleteProduct(id: string): void {
    this.messagingService.setLoadingSmall(true);
    type data = {
      deleteProduct: Product[];
    };

    this.apollo
      .mutate<data>({
        mutation: query.deleteProduct,
        context: {
          headers: new HttpHeaders().set('x-token', authHelpers.getUserToken()),
        },
        variables: {
          id,
        },
      })
      .subscribe(
        ({ data }) => {
          this.messagingService.setLoadingSmall(false);
          if (data?.deleteProduct) {
            const currentProducts: Product[] = this.products.value;
            const newProducts = currentProducts.filter(
              (product) => product.id !== id
            );

            this.setProducts(newProducts);
          }
        },
        (error) => {
          // Stop loading
          this.messagingService.setLoadingSmall(false);
          console.log('there was an error sending the query', error.message);
        }
      );
  }
  // public getProduct(id: string): void {
  //   this.messagingService.setLoadingSmall(true);
  //   type data = {
  //     getProduct: Product;
  //   };

  //   this.apollo
  //     .mutate<data>({
  //       mutation: query.createProduct,
  //       context: {
  //         headers: new HttpHeaders().set('x-token', authHelpers.getUserToken()),
  //       },
  //       variables: {
  //         id: id,
  //       },
  //     })
  //     .subscribe(
  //       ({ data }) => {
  //         this.messagingService.setLoadingSmall(false);
  //         if (data) {
  //         }
  //       },
  //       (error) => {
  //         // Stop loading
  //         this.messagingService.setLoadingSmall(false);
  //         console.log('there was an error sending the query', error.message);
  //       }
  //     );
  // }
  public queryProducts(): void {
    this.messagingService.setLoadingSmall(true);
    type data = {
      getProducts: Product[];
    };

    this.apollo
      .watchQuery<data>({
        query: query.getProducts,
        context: {
          headers: new HttpHeaders().set('x-token', authHelpers.getUserToken()),
        },
      })
      .valueChanges.subscribe(({ data }) => {
        // this.messagingService.setLoadingBig(loading);
        if (data) {
          this.messagingService.setLoadingSmall(false);
          this.setProducts(data.getProducts);
        }
      }),
      (error) => {
        // Stop loading and display error message

        this.messagingService.setLoadingBig(false);
        console.log(
          '%cThere was an error sending the login query',
          'background: #222; color: #bada55',
          error.message
        );
      };
  }

  // public updateProduct(product: Product): void {
  //   console.log(product.id);

  //   type data = {
  //     updateProduct: User;
  //   };
  //   this.apollo
  //     .mutate<data>({
  //       mutation: query.updateProduct,
  //       context: {
  //         headers: new HttpHeaders().set('x-token', authHelpers.getUserToken()),
  //       },
  //       variables: {
  //         ...product,
  //       },
  //     })
  //     .subscribe(
  //       ({ data }) => {
  //         if (data) {
  //           this.authService.setUser(data.updateProduct);
  //           this.router.navigate(['/customer/home']);
  //         }
  //       },
  //       (error) => {
  //         // Stop loading
  //         this.messagingService.setLoadingSmall(false);
  //         console.log('there was an error sending the query', error.message);
  //       }
  //     );
  // }
}
