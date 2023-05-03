import { Component } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'pm-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    let storage: Product[] = [];
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.messagesService.add(
        'ProductListComponent: finished fetching products'
      );
    });
  }
}
