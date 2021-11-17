import React from "react";

import VerticalNav from "components/vertical-navs/VerticalNav";
import Support from "components/Support";

export default function SupportPage() {
  return (
    <React.Fragment>
      <VerticalNav content={null} bucketMain={[<Support key="support-page" content={null} />]} />
    </React.Fragment>
  );
}
