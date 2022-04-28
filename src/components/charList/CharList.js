import { useState, useEffect } from 'react';
import './charList.scss';
import { MarvelService } from '../../services/Marvel';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


const CharList = ({changeCharacterId}) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [countChars, setCountChars] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const [currentCharId, setCurrentCharId] = useState(null);
    
    useEffect(() => {
        renderCharacters();
    }, []);

    const getCharacters = new MarvelService();
    
    const renderCharacters = (count) => {
        setNewItemLoading(true);

        getCharacters.getAllCharacters(count)
        .then(res => {
            let disable = false;

            if(res.length < 9) {
                disable = true; 
            }

            setCharacters(prev => [...prev, ...res]);
            setLoading(false);
            setCountChars(countChars => countChars + 9)
            setNewItemLoading(false);
            setDisableButton(disable)
        })
        .catch(() => {
            setError(true); 
            setLoading(false);
        });
    }

    const onSelectChar = (id) => {
        setCurrentCharId(id);
    }

    const renderItems = (characters) => {
        return (
            <ul className="char__grid">
                {
                    characters.map(char => {
                        let imgStyle = { "objectFit" : "cover" };
                        const itemClass = char.id === currentCharId ? "char__item char__item_selected" : "char__item";
    
                        if(char.image.includes('image_not_available')) {
                            imgStyle = { "objectFit" : "contain" };
                        }                    
    
                        return(
                            <li className={itemClass} key={char.id}
                                tabIndex="0"
                                onKeyDown={({key}) => {
                                    if(key === "Enter") {
                                        changeCharacterId(char.id)
                                        onSelectChar(char.id)
                                    }
                                }}
                                onClick={() => {
                                    changeCharacterId(char.id)
                                    onSelectChar(char.id)
                                }}
                            >
                                <img src={char.image} alt="abyss" style={imgStyle}/>
                                <div className="char__name">{char.name}</div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? renderItems(characters): null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="char__list">
            {spinner}
            {content}
            {errorMessage}

            <button className={`button button__main button__long button__list ${newItemLoading ? "button__disable" : ''}`} 
                    disabled={newItemLoading}
                    style={disableButton ? {display: 'none'} : {display: 'block'}}
                    onClick={() => renderCharacters(countChars)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

export default CharList;