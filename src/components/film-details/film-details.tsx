import { useEffect, useState } from "react";
import TMatch from "@constants/types";
import { TFilmDetails } from "@redux/reducers/films/types/types";
import Spinner from "@components/spinner/spinner";
import MenuList from "@components/menu-list/menu-list.connect";
import Adapter from "@redux/reducers/films/utils/adapter";
import createFilmCards from "@components/film-list/utils/utils";
import history from "../../utils/history";
import Service from "../../api/api";

interface IFilmDetailsProps {
  loadDetails: (id: number) => void,
  match: TMatch
  details: TFilmDetails,
  loading: boolean,
  error: boolean,
}

const FilmDetails: React.FC<IFilmDetailsProps> = (props: IFilmDetailsProps): JSX.Element => {
  const [filmsRecommendations, setFilms] = useState([]);
  const { id } = props.match.params;
  const { loading, error, details } = props;

  function getFilmRecommendations(): void {
    // Получаем список рекомендаций
    Service.getRecommendations(id)
      .then((body) => {
        // setFilms(body.data.results.slice(0, 6))
        const films = Adapter.changeKeyName(body.data.results.slice(0, 6));
        setFilms(films);
      });
  }

  useEffect((): void => {
    // Загружаем детальную информацию о фильме
    props.loadDetails(id);

    getFilmRecommendations();
  }, []);

  // Загружаем новые данные, если обновился ID фильма
  useEffect((): void => {
    props.loadDetails(id);
  }, [id]);
  console.log(details);
  return (
    <>
      {loading && <Spinner />}
      {details && !loading && (
        <>
          <div className="film-details">
            <>
              <div className="film-details__poster">
                <img src={`https://image.tmdb.org/t/p/w342/${details.posterPath}`} alt="Изображение" />
              </div>
              <div className="film-details__wrapper">
                <div className="film-details__header">
                  <div className="film-details__header-inner">
                    <h1 className="film-details__header-text">{details.title}</h1>
                    <p className="film-details__header-information">
                      {details.voteAverage}
                      {" "}
                      /
                      {details.runtime !== 0 ? `${details.runtime} min. /` : null }
                      {" "}
                      2020
                    </p>
                  </div>
                  <h2 className="film-details__header-subtext">{details.tagline}</h2>
                </div>
                <div className="film-details__genres">
                  <h3>Жанры</h3>
                  <MenuList items={details.genres} noActive />
                </div>
                <div className="film-details__description">
                  <h3>Описание</h3>
                  <p>
                    {details.overview}
                  </p>
                </div>
                <div>
                  <button className="film-details__button" type="button" onClick={() => { history.goBack(); }}>Назад</button>
                </div>
              </div>
            </>
          </div>
          <div>
            <h2>Возможно вам понравится: </h2>
            <div className="film-list">
              {createFilmCards(filmsRecommendations)}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FilmDetails;
