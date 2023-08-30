import React, { useEffect, useState } from 'react';
import TitleAdmin from '../TitleAdmin'
import { getArchiveCommentary } from '../../../api/backend/account';

import TableArchiveCommentary from './TableArchiveCommentary';

const Archive = () => {
    const [commentary, setCommentary] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
        getArchiveCommentary()
          .then((commentary) => setCommentary(commentary.data))
          .catch((e) => {
            console.log(e.code);
            if (e.code === 'ERR_NETWORK') {
              setError(true);
            }
          });
      }, []);
console.log(commentary);
  return (
    <div>
       <TitleAdmin title={"Archives"} />
       <TableArchiveCommentary commentary={commentary}  />
    </div>
  )
}

export default Archive
