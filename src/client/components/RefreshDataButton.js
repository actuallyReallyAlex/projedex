import React from 'react'
import PropTypes from 'prop-types'
import { refreshData } from '../redux/actions/app'
import { connect } from 'react-redux'

const RefreshDataButton = ({ handleRefreshData }) => {
  return (
    <button onClick={handleRefreshData} type="button">
      Refresh Data
    </button>
  )
}

RefreshDataButton.propTypes = {
  handleRefreshData: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  handleRefreshData: () => dispatch(refreshData())
})

export default connect(null, mapDispatchToProps)(RefreshDataButton)
