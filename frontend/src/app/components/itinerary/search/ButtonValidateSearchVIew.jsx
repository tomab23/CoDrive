import React from "react";
import Button from "../../Custom/Button";

const ButtonValidateSearchVIew = ({ filterView, loading }) => {
  return (
    <div>
      <div className="flex gap-5 justify-center">
        {!loading ? (
          <Button
            type="submit"
            label="Rechercher"
            className=" outline outline-2 bg-secondary outline-secondary"
          />
        ) : (
          <Button
            type="submit"
            label="Recherche..."
            className=" outline outline-2 bg-secondary outline-secondary cursor-wait"
            disabled={true}
          />
          
        )}
        <Button
          type="button"
          label="Filtrer"
          className="py-1 outline outline-2 outline-dark text-dark bg-input  "
          onClick={filterView}
        />
      </div>
    </div>
  );
};

export default ButtonValidateSearchVIew;
