import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import styled from "@emotion/styled";

const Stars = ({ note, color, size }) => {

    // console.log("star", note);
    const [notation, setNotation] = useState(0);

    useEffect(() => {
      setNotation(note);
    })

  return (
    <div>
      <Stack spacing={1}>
        <Rating
          name="half-rating-read"
          defaultValue={note}
          precision={0.5}
          size={size}
          style={color}
          emptyIcon={<StarIcon style={{ color: "#47634F35" }} fontSize={size}/>}
          readOnly
        />
      </Stack>
    </div>
  );
};

export default Stars;
