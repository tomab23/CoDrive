import { Card, CardActions, CardContent, Collapse, IconButton } from '@mui/material';
import React, { useState } from 'react'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const FaqQuestion = ({ question, info}) => {

    const [open, setOpen] = useState(false);

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest
        })
      }));

      const handleOpenClick = () => {
        setOpen(!open);
      };


  return (
    <Card sx={{ width: window.innerWidth > 500 ? 700 : 380 , maxWidth : 700}}>
      <CardActions disableSpacing>
        <h6 className='font-bold sm:text-xl xs:text-lg'>{question}</h6>
        <ExpandMore
          expand={open}
          onClick={handleOpenClick}
          aria-expanded={open}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ backgroundColor: "#92E3A9" }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CardContent>
          <p>{info}</p>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default FaqQuestion
