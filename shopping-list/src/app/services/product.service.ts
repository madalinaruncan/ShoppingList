import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable, of } from 'rxjs';
import { MessagesService } from './messages.service';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsKey = 'products';

  private products: Product[] = [];
  constructor(private messagesService: MessagesService) {
    this.getProductsFromLocalStorage();
  }

  private getProductsFromLocalStorage(): void {
    const products = localStorage.getItem(this.productsKey);
    if (products) {
      this.products = JSON.parse(products);
    }
  }

  private saveProductsToLocalStorage(): void {
    localStorage.setItem(this.productsKey, JSON.stringify(this.products));
  }

  addProduct(product?: Product): Observable<Product> {
    if (!product || !product.id) {
      this.messagesService.add(`ProductService: product is undefined}`);
      throw new Error('Product is undefined');
    }
    product.id = +product.id;
    if (this.products.find((p) => p.id === product.id)) {
      this.messagesService.add(
        `ProductService: product with id=${product.id} already exists}`
      );
      throw new Error('Product with this id already exists');
    }
    this.products.push(product);
    this.saveProductsToLocalStorage();
    this.messagesService.add(`ProductService: added product id=${product.id}`);
    return of(product);
  }

  updateProduct(product: Product): Observable<Product> {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index === -1) {
      this.messagesService.add(`ProductService: product with id=${product.id} does not exist`);
      throw new Error('Product not found');
    }
    this.products[index] = product;
    localStorage.setItem('products', JSON.stringify(this.products));
    this.messagesService.add(`ProductService: updated product id=${product.id}`);
    return of(product);
  }

  getProducts(): Observable<Product[]> {
    const products = of(this.products);
    this.messagesService.add('ProductService: started fetching products');
    return products;
  }

  getProduct(id: number): Observable<Product> {
    const product = this.products.find((p) => p.id === id) as Product;
    this.messagesService.add(`ProductService: fetched product id=${id}`);
    return of(product);
  }

  deleteProduct(productId: number): Observable<void> {
    const productIndex = this.products.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      this.messagesService.add(
        `ProductService: product with id=${productId} does not exist`
      );
      throw new Error('Product with this id does not exist');
    }
    this.products.splice(productIndex, 1);
    this.saveProductsToLocalStorage();
    this.messagesService.add(
      `ProductService: deleted product id=${productId}`
    );

    return of(undefined);
  }
}
