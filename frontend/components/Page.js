import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

const theme = {

}

class Page extends Component {
    render() {
        return(
            <ThemeProvider theme={theme}>
                {this.props.children}
            </ThemeProvider>
        )
    }
}

export default Page;