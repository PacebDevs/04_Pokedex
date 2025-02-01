import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: false,
})
export class ListPokemonsPage implements OnInit {

  public pokemons: Pokemon[] = []; 

  constructor(
    private pokemonService: PokemonService,
    private loadingController: LoadingController,
    private navParams: NavParams,
    private navController: NavController
  ) {
    
   }

  ngOnInit() {
    this.morePokemon();
  }

  async morePokemon($event = null){
    let loading = null;
    if(!$event){
      loading = await this.loadingController.create({
        message: 'Cargando...'
      });
      await loading.present();
    }
    const promise =this.pokemonService.getPokemons();
    if(promise){
      promise.then( (result: Pokemon[]) =>{
        console.log(result);
        this.pokemons = this.pokemons.concat(result);
        console.log(this.pokemons);
        if($event){
          $event.target.complete();
        }
        if(loading){
          loading.dismiss();
        }
      }).catch((err) =>{
        $event.target.complete();
        loading.dismiss();
      })
      
    }
  }
  goToDetail(pokemon: Pokemon){
    this.navParams.data["pokemon"] = pokemon;
    this.navController.navigateForward("detail-pokemon");
  }

}
