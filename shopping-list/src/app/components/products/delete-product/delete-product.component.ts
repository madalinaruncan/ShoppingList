import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'pm-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductComponent {
  id?: number;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  onConfirm(): void {
    if (this.id) {
      this.productService.deleteProduct(this.id).subscribe(() => {
        console.log(
          'ProductDeleteComponent: deleted product with id ' + this.id
        );
        this.location.back();
      });
    }
  }

  onCancel(): void {
    this.location.back();
  }
}
