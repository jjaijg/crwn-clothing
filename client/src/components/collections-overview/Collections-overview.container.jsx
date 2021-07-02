import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import WithSpinner from "../../components/with-spinner/With-spinner.component";
import CollectionsOverview from "./Collections-overview.component";

import { selectIsCollectionsFetching } from "../../redux/shop/shop.selectors";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionsFetching,
});
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
