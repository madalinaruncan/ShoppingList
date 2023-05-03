import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'pm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }

  showBoughtProducts(): void {
    let bougthProducts: Product[] = [];
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].bougthAtPrice != undefined) {
        bougthProducts.push(this.products[i]);
      }
    }
    this.products = bougthProducts;
  }

  showProductsToBuy(): void {
    let toBuyProducts: Product[] = [];
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].bougthAtPrice === undefined) {
        toBuyProducts.push(this.products[i]);
      }
    }
    this.products = toBuyProducts;
  }

  sortByPrice(): void {
    let sortedProducts: Product[] = Object.assign([], this.products);
    sortedProducts.sort((p1, p2) => {
      if (p1.bougthAtPrice === undefined && p2.bougthAtPrice === undefined) {
        return 0;
      } else if (p1.bougthAtPrice === undefined && p2.bougthAtPrice !== undefined) {
        return 1;
      } else if (p1.bougthAtPrice !== undefined && p2.bougthAtPrice === undefined) {
        return -1;
      } else {
        if (p1.bougthAtPrice! * p1.quantity! === p2.bougthAtPrice! * p2.quantity!) {
          return 0;
        } else if (p1.bougthAtPrice! * p1.quantity! > p2.bougthAtPrice! * p2.quantity!) {
          return -1;
        } else {
          return 1;
        }
      }
    });
    this.products = sortedProducts;
  }

  public show: boolean = false;
  public sort: boolean = false;
  public report1: any = 'Show bought products';
  public report2: any = 'Show products to buy';
  public report3: any = 'Sort by price';

  toggleBoughtProducts() {
    this.show = !this.show;

    if (this.show)
      this.report1 = "Hide bougth products";
    else
      this.report1 = "Show bougth products";
  }

  toggleProductsToBuy() {
    this.show = !this.show;

    if (this.show)
      this.report2 = "Hide products to buy";
    else
      this.report2 = "Show products to buy";
  }

  toggleSortByPrice() {
    this.sort = !this.sort;

    if (this.sort)
      this.report3 = "Hide the sorting";
    else
      this.report3 = "Show products sorted by price";
  }
}

