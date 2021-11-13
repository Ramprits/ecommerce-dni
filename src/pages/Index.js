import React from 'react';

import VerticalNav3 from '../components/vertical-navs/VerticalNav3';
import Header3 from '../components/headers/Header3';

export default function Index() {
  return (
    <React.Fragment>
      <VerticalNav3 content={null} bucketMain={[<Header3 content={null} />]} />
    </React.Fragment>
  );
}

