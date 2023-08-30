import React, { useEffect, useState } from "react";
import Navbar from "../../components/layouts/Navbar";
import {
  getStatsTransactions
} from "../../api/backend/account";
import Adminview from "./../../components/admin/Transaction/Adminview";
import Footer from "../../components/layouts/Footer";
import ReturnButton from './../../components/ReturnButton';
import CardStatsTransaction from "../../components/cards/CardStatsTransaction";

const TransactionDashboard = () => {
  const [buy, setBuy] = useState();
  const [sell, setSell] = useState();
  const [credits, setCredits] = useState();
  const [transaction, setTransaction] = useState();

  const [buyLoading, setBuyLoading] = useState(false);
  const [sellLoading, setSellLoading] = useState(false);
  const [creditsLoading, setCreditsLoading] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);


  useEffect(() => {
    if (buy === undefined) {
      setBuyLoading(true);
    } else {
      setBuyLoading(false);
    }
    if (sell === undefined) {
      setSellLoading(true);
    } else {
      setSellLoading(false);
    }
    if (transaction === undefined) {
      setTransactionLoading(true);
    } else {
      setTransactionLoading(false);
    }
    if (credits === undefined) {
      setCreditsLoading(true);
    } else {
      setCreditsLoading(false);
    }
  }, [buy, sell, transaction, credits]);

  useEffect(() => {
    // getSumCreditsBuy()
    //   .then((res) => setBuy(res.data))
    //   .catch((e) => console.log("buy", e.code));
    // getSumCreditsSell()
    //   .then((res) => setSell(res.data))
    //   .catch((e) => console.log("sell", e.code));
    // getCountTransaction()
    //   .then((res) => setTransaction(res.data))
    //   .catch((e) => console.log("transaction", e.code));
    // getSumCreditsUse()
    //   .then((res) => setCredits(res.data))
    //   .catch((e) => console.log("credits", e.code));
    getStatsTransactions()
      .then((res) => {
        setCredits(res.data.creditsUse)
        setBuy(res.data.creditsBuy)
        setSell(res.data.creditsSell)
        setTransaction(res.data.transactions)
      })
      .catch((e) => {
        console.log(e.code);
      })
  }, []);

  return (
    <div>
      <Navbar />
      
      <div className="xl:ml-20 sm:ml-10 my-5">
      {window.innerWidth > 500 &&
      <ReturnButton />
      }
      </div>
      <h4 className="font-bold xl:ml-20 sm:ml-10 xs:ml-6">
        <span className="bg-primary p-1">Dashboard</span> - Transactions
      </h4>

      <div className="xl:ml-20 sm:ml-10 xs:ml-2 xs:pr-2 sm:pr-0 mt-10">
        <div className="flex gap-5 mt-5">
      <CardStatsTransaction
        title="crédits obtenus"
        number={buy === null ? 0 : buy}
        loading={buyLoading}
      />
            <CardStatsTransaction
        title="crédits perdus"
        number={sell === null ? 0 : sell}
        loading={sellLoading}
      />
            <CardStatsTransaction
        title="crédits utilisés"
        number={credits === null ? 0 : credits}
        loading={creditsLoading}
      />
            <CardStatsTransaction
        title="Transaction éffectuées"
        number={transaction}
        loading={transactionLoading}
      />
        </div>
      </div>

      {/* DATA GRID */}
      <h5 className="xl:ml-20 sm:ml-10 xs:ml-6 mt-10 mb-5 font-bold">
        <span className="bg-primary p-1">Transactions</span>
      </h5>
      <div>
        <Adminview admin={false} />
      </div>

      <Footer />
    </div>
  );
};

export default TransactionDashboard;
