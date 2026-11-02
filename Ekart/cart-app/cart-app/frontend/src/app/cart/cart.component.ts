import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { CartService } from './cart.service';
import { CartItem } from './cart.model';

@Component({
  selector: 'app-root',            // used as the root so index.html needs no change
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  form: CartItem = { name: '', price: 0, quantity: 1 };
  editingId: number | null = null;   // null = "add mode", number = "edit mode"
  error = '';

  constructor(private cartService: CartService) {}

  ngOnInit() { this.load(); }

  // GET
  load() {
    this.cartService.getAll().subscribe({
      next: data => { this.items = data; this.error = ''; },
      error: () => this.error = 'Cannot reach backend. Is Spring Boot running on port 8080?'
    });
  }

  // POST or PUT
  save() {
    if (!this.form.name.trim()) return;
    const request = this.editingId === null
      ? this.cartService.add(this.form)
      : this.cartService.update(this.editingId, this.form);

    request.subscribe(() => { this.reset(); this.load(); });
  }

  // fill the form with the chosen row
  edit(item: CartItem) {
    this.editingId = item.id!;
    this.form = { ...item };
  }

  // DELETE
  remove(id: number) {
    this.cartService.delete(id).subscribe(() => this.load());
  }

  reset() {
    this.form = { name: '', price: 0, quantity: 1 };
    this.editingId = null;
  }

  get total(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }
}
