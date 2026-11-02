import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from './cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private api = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CartItem[]>            { return this.http.get<CartItem[]>(this.api); }
  add(item: CartItem): Observable<CartItem>   { return this.http.post<CartItem>(this.api, item); }
  update(id: number, item: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.api}/${id}`, item);
  }
  delete(id: number): Observable<void>        { return this.http.delete<void>(`${this.api}/${id}`); }
}
