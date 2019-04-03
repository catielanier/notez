import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Meta from './Meta';
import Header from './Header';

const theme = {
    background: '#3c3c3c',
    foreground: '#f5f5f5',
    action: '#ff7148',
    lightgrey: '#E1E1E1',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
}

injectGlobal`
    @font-face {
        font-family: 'American Captain';
        src: url('/static/amercapt.otf') format('opentype');
        src: url('/static/amercapt.ttf') format('truetype');
    }
  
    @font-face {
        font-family: 'Falling Sky';
        src: url('/static/FallingSky.otf') format('opentype');
    }
    html {
        box-sizing: border-box;
        font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        font-family: 'Falling Sky';
        line-height: 2;
    }
    a {
        text-decoration: none;
        color: ${theme.foreground};
    }
`;

class Page extends Component {
    render() {
        return(
            <ThemeProvider theme={theme}>
                <div>
                    <Meta />
                    <Header />
                    {this.props.children}
                </div>
            </ThemeProvider>
        )
    }
}

export default Page;