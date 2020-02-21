import React from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'
import { saveAccessToken } from '../redux/actions/app'
import { connect } from 'react-redux'
// import { version } from "../../package.json";

const version = 0

const Redirect = ({ handleSaveAccessToken, shouldHitSaveToken }) => {
  const useQuery = () => new URLSearchParams(useLocation().search)
  const query = useQuery()
  const history = useHistory()
  const accessToken = query.get('accessToken')

  // * Only want to make the call if there is an accesstoken in the url
  // * AND if the call has not already been made
  // * seeing this happening like 4 times
  if (accessToken && shouldHitSaveToken) {
    console.log({ accessToken })
    handleSaveAccessToken(history, accessToken)
  } else {
    console.log({ accessToken, shouldHitSaveToken })
  }

  return (
    <div>
      <h1>REDIRECT {version}</h1>
    </div>
  )
}

Redirect.propTypes = {
  handleSaveAccessToken: PropTypes.func.isRequired,
  shouldHitSaveToken: PropTypes.bool.isRequired
}

const mapStateToProps = ({ app }) => ({
  shouldHitSaveToken: app.shouldHitSaveToken
})

const mapDispatchToProps = dispatch => ({
  handleSaveAccessToken: (history, accessToken) => dispatch(saveAccessToken(history, accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(Redirect)
