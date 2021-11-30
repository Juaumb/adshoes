import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { TipoFiltro } from 'src/app/navegacao/models/tipo-filtro';
import { Produto } from '../models/produtos';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.component.html',
  styleUrls: ['./lista-produto.component.css']
})
export class ListaProdutoComponent implements OnInit {
  produtos: Produto[] = [];
  filtrarPor: string ='';
  filtro: string ='';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {

    this.router.events.subscribe( value => {
      this.obterProdutos();
    })
  }

  ngOnInit() {
    this.obterProdutos();
  }

  obterProdutos(){

    this.obterParametros();

    this.http.get<Produto[]>('./assets/dados/produtos.json')
    .subscribe(produto=> {

      this.produtos = produto
      console.log(this.filtro)

      if(this.filtrarPor == TipoFiltro.Marca){
        this.produtos = this.produtos.filter(
          x=>x.marca.trim().toLowerCase() == this.filtro.trim().toLowerCase()
          );
      }

      if(this.filtrarPor == TipoFiltro.Estilo){
        this.produtos = this.produtos.filter(
          x=>x.estilo.trim().toLowerCase() == this.filtro.trim().toLowerCase()
          );
      }

      if(this.filtrarPor == TipoFiltro.Cor){
        this.produtos = this.produtos.filter(
          x=>x.cor.trim().toLowerCase() == this.filtro.trim().toLowerCase()
          );
      }

    });

  }

  obterParametros(){
    this.filtrarPor = this.route.snapshot.params['filtrarpor'];
    this.filtro = this.route.snapshot.params['filtro'];
  }
}
