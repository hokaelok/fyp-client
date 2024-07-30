import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRockets,
  selectAllRockets,
  getRocketsStatus,
  getRocketsError,
  reserveRocket
} from "./userSlice";

const User = () => {
  const dispatch = useDispatch();
  const rockets = useSelector(selectAllRockets);
  const rocketStatus = useSelector(getRocketsStatus);
  const error = useSelector(getRocketsError);

  const displayReservedText = (currsState) => {
    return currsState ? "Cancel Reservation" : "Reserve Rocket";
  };

  const handleReserveRocket = (id) => {
    dispatch(reserveRocket(id));
  };

  useEffect(() => {
    if (rocketStatus === 'idle') {
      dispatch(fetchRockets());
    }
  }, [rocketStatus, dispatch]);

  if (rocketStatus === 'loading') {
    return <h2>Loading...</h2>;
  }

  if (rocketStatus === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {rockets.map((rocket) => (
        <div key={rocket.id}>
          <h2>{rocket.rocket_name}</h2>
          <p>
            {rocket.reserved && (
              <span
                style={{
                  marginRight: 10,
                  border: "1px solid",
                  padding: "2px 4px",
                }}
                bg="info"
              >
                Reserved
              </span>
            )}
            {rocket.description}
          </p>
          <button onClick={() => handleReserveRocket(rocket.id)} type="button">
            {displayReservedText(rocket.reserved)}
          </button>
          <hr />
        </div>
      ))}
    </>
  );
};

export default User;