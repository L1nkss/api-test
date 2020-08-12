// https://image.tmdb.org/t/p/w342/

interface IFilmCard {
  name: string,
  poster: string
}

const FilmCard: React.FC<IFilmCard> = (props: IFilmCard): JSX.Element => {
  return (
    <a href="https://">
      <div className="film-card">
        <img className="film-card__image" src={`https://image.tmdb.org/t/p/w342/${props.poster}`} alt="Изображение" />
        <div className="film-card__wrapper">
          <h4>{props.name}</h4>
          <p>2016, 109 min</p>
        </div>
      </div>
    </a>
  );
};

export default FilmCard;
