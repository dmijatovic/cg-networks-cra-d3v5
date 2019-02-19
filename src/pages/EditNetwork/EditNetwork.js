import React, { Component } from 'react';

import PageTitle from '../../components/PageTitle/PageTitle'
import ForceDirectedGraph from '../../components/ForceDirectedGraph/ForceDirectedGraph'

class EditNetwork extends Component {
  showModal = data => {
    console.log('Show modal', data)
    this.setState({
      showModal: true,
      modalType: data.type
    })
  }
  render() {
    return (
      <React.Fragment>
        <PageTitle title="Edit network"/>
        <ForceDirectedGraph />
      </React.Fragment>
    );
  }
}

export default EditNetwork;