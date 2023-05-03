import { Component, Input } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'pm-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent {
  product?: Product;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService
      .getProduct(id)
      .subscribe((product) => (this.product = product));
  }

  onUpdate(): void {
    if (this.product) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.location.back();
      });
    }
  }

  onBack(): void {
    this.location.back();
  }
}
