import './charInfo.scss';
import { useState, useEffect } from 'react';
import { MarvelService } from '../../services/Marvel';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = ({currentCharId}) => {
    const [char, setCurrentCharId] = useState(null)
    const marvelService = new MarvelService();

    useEffect(() => {
        onChangeCharacter(currentCharId);
    }, [currentCharId]);

    const onChangeCharacter = id => {
        if(!id) return 

        marvelService.getCharacter(id)
        .then(res => setCurrentCharId(res))
        .catch(e => console.log(e))
    }

    const content = char ? <Content char={char}/> : null;
    const skeleton = !char ? <Skeleton /> : null;
    
    return (
        <div className="char__info">
            {skeleton}
            {content}
        </div>
    )
}

const Content = ({char}) => {
    return (
        <>
            <div className="char__basics">
                <img src={char.image} alt={ char.name }/>
                <div>
                    <div className="char__info-name">{ char.name }</div>
                    <div className="char__btns">
                        <a href={char.homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={char.wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {char.description} 
            </div>
            
            <div className="char__comics" style={char.stories.length < 1 ? {display: 'none'} : null}>Comics:</div>
            <ul className="char__comics-list">
                {
                    char.stories.map((item, i) => {
                        if(i < 10)  {
                            return (
                                <li className="char__comics-item" key={i}>
                                    {item.name}
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;