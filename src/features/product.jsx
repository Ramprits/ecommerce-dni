import React from "react";

import VerticalNav from "components/vertical-navs/VerticalNav";
import ProductList from "components/product/product-list";

export default function ProductPage() {
  return (
    <React.Fragment>
      <VerticalNav
        content={null}
        bucketMain={[<ProductList key="product-page" content={null} />]}
      />
    </React.Fragment>
  );
}
