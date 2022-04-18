import { Component } from 'react';
import './charList.scss';
import { MarvelService } from '../../services/Marvel';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


class CharList extends Component {
    
    state = {
        characters: [],
        loading: true,
        error: false
    }

    componentDidMount() {
        this.renderCharacters();
    }

    characters = new MarvelService();
    
    renderCharacters = () => {
        this.setState({loading: true})
        this.characters.getAllCharacters()
        .then(res => this.setState({characters: res, loading: false}))
        .catch(() => this.setState({error: true, loading: false}));
    }

    renderItems(characters) {
        return (
            <ul className="char__grid">
                {
                    characters.map(char => {
                        let imgStyle = { "objectFit" : "cover" };
    
                        if(char.image.includes('image_not_available')) {
                            imgStyle = { "objectFit" : "contain" };
                        }                    
    
                        return(
                            <li className="char__item" key={char.id} onClick={() => this.props.changeCharacterId(char.id)}>
                                <img src={char.image} alt="abyss" style={imgStyle}/>
                                <div className="char__name">{char.name}</div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render() {
        const {characters, loading, error} = this.state; 
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? this.renderItems(characters): null;
        const errorMessage = error ? <ErrorMessage/> : null;

        return (
            <div className="char__list">
                {spinner}
                {content}
                {errorMessage}

                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;