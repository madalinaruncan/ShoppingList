import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { Location } from '@angular/common';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'pm-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
  userProduct: any = {};
  product?: Product = {
    id: undefined,
    name: '',
    quantity: undefined,
    bougthAtPrice: undefined,
  };
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private messagesService: MessagesService,
    private location: Location
  ) { }

  onAdd(): void {
    try {
      this.productService.addProduct(this.product).subscribe(() => {
        this.messagesService.add(
          `ProductAddComponent: added ${this.product?.name}`
        )
        this.location.back();
      });
    } catch (error) {
      this.messagesService.add(
        `ProductAddComponent: error adding ${this.product?.name}`
      );
    }
  }

  onBack(): void {
    this.location.back();
  }

  addProduct(product?: Product) {
    let products = [];
    if (localStorage.getItem('Products')) {
      products = JSON.parse(localStorage.getItem('Products') || '{}');
      products = [product, ...products];
    } else {
      products = [product];
    }
    localStorage.setItem('Products', JSON.stringify(product));
  }

}
