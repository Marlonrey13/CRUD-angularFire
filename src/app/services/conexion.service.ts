import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  private itemDoc!: AngularFirestoreDocument<Item>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection<Item>('items')
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  listaItem() {
    return this.items
  }

  addItem(item: Item) {
    this.itemsCollection.add(item)
  }

  removeItem(item: any) {
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`)
    this.itemDoc.delete()
  }

  editItem(item: any) {
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`)
    this.itemDoc.update(item)
  }
}
