import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Authenticate from '../components/Authenticate'
import Dashboard from '../components/Dashboard'

const Home = ({ userData }) => (userData ? <Dashboard userData={userData} /> : <Authenticate />)

Home.propTypes = {
  userData: PropTypes.object
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData
})

export default connect(mapStateToProps, null)(Home)
