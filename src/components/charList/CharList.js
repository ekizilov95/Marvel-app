import { Component } from 'react';
import './charList.scss';
import { MarvelService } from '../../services/Marvel';


class CharList extends Component {
    constructor() {
        super()
        this.renderCharacters();
    }

    state = {
        characters: []
    }

    characters = new MarvelService();
    
    renderCharacters = () => {
        this.characters.getAllCharacters().then(res => this.setState({characters: res}));
    }

    render() {
        const {characters} = this.state; 

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {
                        characters.map(char => {
                            return(
                                <li className="char__item" key={char.id}>
                                    <img src={char.image} alt="abyss"/>
                                    <div className="char__name">{char.name}</div>
                                </li>
                            )
                        })
                    }
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;