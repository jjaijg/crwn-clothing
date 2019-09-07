import React, { Component } from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/Collections-overview.component";
import CollectionPage from "../collection/Collection.component";

const ShopPage = ({ match }) => {
  console.log(`${match.path}/:categoryId`);
  return (
    <div className="shop-page">
      <Route exact path={match.path} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
};

export default ShopPage;
