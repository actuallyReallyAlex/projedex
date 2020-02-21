import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { importRepos } from '../redux/actions/app'
import { getRepos } from '../redux/actions/app'
import { connect } from 'react-redux'

const GetRepos = ({ handleImportRepos, handleGetRepos }) => {
  const [repos, setRepos] = useState([])
  const [selectedRepos, setSelectedRepos] = useState([])

  const handleImportAll = () => {
    console.log('import all button clicked')
    handleImportRepos(repos)
  }
  const handleImportSelected = () => {
    console.log('import selected button clicked')
    handleImportRepos(selectedRepos.map(id => ({ id })))
  }

  return (
    <Fragment>
      {repos.length === 0 && (
        <button onClick={() => handleGetRepos(setRepos)} type="button">
          Get Repos
        </button>
      )}
      <div id="repos">
        {repos.length > 0 && (
          <Fragment>
            <button onClick={handleImportAll} type="button">
              Import All
            </button>
            <button onClick={handleImportSelected} type="button">
              Import Selected
            </button>
          </Fragment>
        )}
        {repos.map(({ id, name }) => (
          <div key={id}>
            <input
              checked={selectedRepos.includes(id)}
              type="checkbox"
              id={id}
              name={name}
              onChange={e => {
                if (e.target.checked) {
                  const newArray = Array.from(selectedRepos)
                  newArray.push(id)
                  console.log({ newArray })

                  setSelectedRepos(newArray)
                } else {
                  const newArray = Array.from(selectedRepos).filter(selectedRepoId => selectedRepoId !== id)
                  console.log({ newArray })
                  selectedRepos(newArray)
                }
              }}
            />
            <label htmlFor={id}>{name}</label>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

GetRepos.propTypes = {
  handleImportRepos: PropTypes.func.isRequired,
  handleGetRepos: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  handleImportRepos: repos => dispatch(importRepos(repos)),
  handleGetRepos: setRepos => dispatch(getRepos(setRepos))
})

export default connect(null, mapDispatchToProps)(GetRepos)
