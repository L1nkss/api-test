import Cast from "@components/cast/cast";
import Spinner from "@components/spinner/spinner";
import { useEffect, useState } from "react";
import TMatch from "@constants/types";
import Service from "../../api/api";
import CastAdapter from "../../utils/adapters/cast";
import history from "../../utils/history";

interface IActorsProps {
  match: TMatch
}

const Actors: React.FC<IActorsProps> = (props: IActorsProps): JSX.Element => {
  const { id } = props.match.params;
  const [isCastLoading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    setLoading(true);

    Service.getFilmCast(id)
      .then((body) => {
        setCast(CastAdapter.adaptValues(body.data.cast));
        setLoading(false);
      });
  }, []);
  return (
    <div className="actors">
      <div className="actors__header">
        <h2>Состав</h2>
        <button
          type="button"
          className="actors__back-button"
          onClick={() => { history.goBack(); }}
        >
          <i className="fas fa-arrow-left actors__icon" />
        </button>
      </div>
      {isCastLoading && <Spinner />}
      {!isCastLoading && <Cast cast={cast} itemsToShow="all" />}
    </div>
  );
};

export default Actors;
