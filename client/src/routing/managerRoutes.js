import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../app/utils/Spinner";
import PropTypes from "prop-types";

const ManagerRoutes = (
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
          user.isManager ? (
            <Component {...props} />
          ) : (
            <Redirect to="/manager/login" />
          )
        ) : (
          <Redirect to="/manager/login" />
        )
      }
    />
  );
};
ManagerRoutes.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ManagerRoutes);
