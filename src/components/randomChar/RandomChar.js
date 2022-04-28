import { useState, useEffect } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { MarvelService } from '../../services/Marvel'
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const RandomChar = () => {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateCharacter();
    }, [])
    
    const onCharLoading = () => {
        setLoading(true);
    }

    const updateCharacter = () => {
        let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        onCharLoading();

        marvelService.getCharacter(id)
        .then(res => {
            setChar(res);
            setLoading(false)
        })
        .catch(() => {
            setLoading(false); 
            setError(true);
        });
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error)? <Content char={char}/> : null;

    return (
        <div className="randomchar">
            {spinner}
            {errorMessage}
            {content}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateCharacter}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const Content = ({char}) => {
    const {image, name, description, homepage, wiki} = char;
    const noImage = image.includes('image_not_available');
    const imageClass =  noImage ? 'randomchar__img randomchar__img_not-available' : 'randomchar__img';
    
    return (
        <div className="randomchar__block">
            <img src={image} alt="Random character" className={imageClass} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description ? description : "description is blank"}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
} 

export default RandomChar;