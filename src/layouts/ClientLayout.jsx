import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import withLayout from "hocs/withLayout";
import React, { Component } from "react";


class ClientLayout extends Component {
  render() {
    return (
      <>
        <Header />
        {this.props.children}
        <Footer />
      </>
    );
  }
}

export default withLayout(ClientLayout)
