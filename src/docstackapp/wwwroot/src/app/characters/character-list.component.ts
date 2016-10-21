import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { CharacterService } from './shared/character.service';

@Component({
    templateUrl: 'character-list.component.html'
})
export class CharacterListComponent implements OnInit {
    characters: string[];
    time: string;

    constructor(private characterService: CharacterService) {
        this.refreshTime();
    }

    ngOnInit() {
        this.characterService.getCharacters()
            .subscribe(characters => this.characters = characters);
    }

    refreshTime() {
        let updateTime = () => {
            this.time = moment().format('DD.MM.YYYY HH:mm');
            setTimeout(updateTime, 5000);
        };
        updateTime();
    }
}
