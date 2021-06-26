import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../app/utils/Spinner";
import PropTypes from "prop-types";
import { useLocation } from "react-use";

const ClientRoutes = (
  { component: Component, auth: { isAuthenticated, loading, user } },
  ...rest
) => {

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner />
        ) : isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/client/login" />
          )
      }
    />
  );
};
ClientRoutes.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ClientRoutes);
