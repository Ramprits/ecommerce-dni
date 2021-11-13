import React from "react";

import VerticalNav3 from "components/vertical-navs/VerticalNav";
import Header3 from "components/headers/Header";

export default function Index() {
  return (
    <React.Fragment>
      <VerticalNav3 content={null} bucketMain={[<Header3 key="home-page" content={null} />]} />
    </React.Fragment>
  );
}
