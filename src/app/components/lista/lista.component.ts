import { Component, OnInit } from '@angular/core';
import { ConexionService } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  items: any

  editarItem: any = {
    name: ''
  }
  constructor(private _conexion: ConexionService) {
    this.items = this._conexion.listaItem().subscribe(item => {
      this.items = item
    })
  }

  ngOnInit(): void {
  }

  eliminar(item: any) {
    this._conexion.removeItem(item)
  }

  editar(item: any) {
    this.editarItem = item
  }

  agregarEditado() {
    this._conexion.editItem(this.editarItem)
  }

}
