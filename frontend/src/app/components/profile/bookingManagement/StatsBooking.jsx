import React, { useEffect, useState } from "react";
import CardStatsTransaction from "../../cards/CardStatsTransaction";
import { getBookingStats } from "../../../api/backend/account";

const StatsBooking = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const driverKm = stats.kmDriver == null ? 0 : stats.kmDriver;
  const passengerKm = stats.kmPassenger == null ? 0 : stats.kmPassenger;
  const totalKm = driverKm + passengerKm;

  useEffect(() => {
    if (stats.kmDriver == undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (stats.kmPassenger == undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (stats.nextTravels == undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (stats.nextBookings == undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (stats.totalHistoric == undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    if (stats.nextBookingWaiting == undefined) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [stats]);

  useEffect(() => {
    getBookingStats()
      .then((res) => {
        console.log("stats", res.data);
        setStats(res.data);
      })
      .catch((e) => {
        console.log(e.code);
        setError(e.code);
      });
  }, []);
  console.log(stats);

  console.log(stats);

  return (
    <div className="xl:ml-20 sm:ml-10 xs:ml-6 mt-5">
      {error == null ? (
        <div className="flex xl:flex-row xs:flex-wrap gap-5 mt-5">
                    <CardStatsTransaction
            title="Programmations à venir"
            number={stats.nextTravels == null ? 0 : stats.nextTravels}
            loading={loading}
            booking={true}
          />
          <CardStatsTransaction
            title="Réservations à venir"
            number={stats.nextBookings == null ? 0 : stats.nextBookings}
            loading={loading}
            booking={true}
          />
          <CardStatsTransaction
            title="Réservsations en attente"
            number={
              stats.nextBookingWaiting == null ? 0 : stats.nextBookingWaiting
            }
            loading={loading}
            booking={true}
          />
          <CardStatsTransaction
            title="Total km conducteur"
            number={driverKm}
            loading={loading}
          />
          <CardStatsTransaction
            title="Total km passagé"
            number={passengerKm}
            loading={loading}
          />
          <CardStatsTransaction
            title="Total trajets effectués"
            number={stats.totalHistoric == null ? 0 : stats.totalHistoric}
            loading={loading}
          />
          <CardStatsTransaction
            title="Total km"
            number={String(totalKm)}
            loading={loading}
          />
        </div>
      ) : (
        <p className="text-red-600">
          🚗 Une erreur est survenue, veuillez nous excusez.{" "}
          <span className="ml-10 italic">Code : {error}</span>
        </p>
      )}
    </div>
  );
};

export default StatsBooking;
