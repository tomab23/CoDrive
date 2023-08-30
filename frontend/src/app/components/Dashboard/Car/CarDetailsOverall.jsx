import React, { useEffect, useState } from "react";
import { profile } from "../../../api/backend/account";
import CarDetailsFeatures from "./CarDetailsFeatures";
import demivoiture from "../../../assets/pictures/profile/demivoiture.png";

const CarDetailsOverall = () => {
  const [listCar, setListCar] = useState([]);
  const [nbCar, setNbCar] = useState();
  const [index, setIndex] = useState();
  const [car, setCar] = useState();
  const [car0, setCar0] = useState();
  const [displayDefault, setDisplayDefault] = useState(true);

  const handleChange = (e) => {
    setIndex(e.target[e.target.selectedIndex].index);
    setDisplayDefault(false);
  };

  useEffect(() => {
    profile()
      .then((res) => {
        setListCar(res.data.car);
        setNbCar(res.data.car.length);
        setCar0(res.data.car[0]);
        setCar(res.data.car[Number(index)]);
      })
      .catch(() => setErrorLog(true));
  }, [index]);

  return (
    <div className="CardDetailsOverall">
      {/*si nombre de voiture supérieur à 1 on mappe*/}
      {nbCar > 1 ? (
        <div>
          <div className="flex absolute -top-[140px] left-[500px]">
            <select
              onChange={handleChange}
              className="select select-bordered w-[180px] max-w-xs text-xl"
            >
              {listCar.map((c, index) => (
                <option key={c.id} value={index} id={c.id}>
                  Voiture {[index + 1]}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        ""
      )}

      {/*si nb voiture égal 1 alors on prend la voiture à l'index 0*/}
      {nbCar == 1 || displayDefault == true ? (
        <CarDetailsFeatures img={demivoiture} car={car0} />
      ) : (
        <CarDetailsFeatures img={demivoiture} car={car} />
      )}
    </div>
  );
};

export default CarDetailsOverall;
