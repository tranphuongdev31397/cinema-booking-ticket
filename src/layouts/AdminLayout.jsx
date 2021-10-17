import TopBar from "components/TopBar/TopBar";
import AdminPage from "containers/admin/AdminPage";
import withLayout from "hocs/withLayout";
import React, { Component } from "react";

class AdminLayout extends Component {
  render() {
    return (
     
      <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <TopBar />
        </div>
      </div>
      {this.props.children}
    </div>
       
     
    );
  }
}

export default withLayout(AdminLayout);
