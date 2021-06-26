import React from 'react'
import OrdersClient from "./Order"
import PropTypes from 'prop-types'

const DashboardHome = () => {
    return (
        <div>
          <OrdersClient />
        </div>
    )
}

DashboardHome.propTypes = {

}

export default DashboardHome
