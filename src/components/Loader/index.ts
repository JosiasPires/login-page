import styled from 'styled-components';

const Loader = styled.div`
    border: 16px solid #fff;
    border-radius: 50%;
    border-top: 16px solid #000;
    border-right: 16px solid #000;
    border-bottom: 16px solid #000;
    width: 0px;
    height: 0px;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

export default Loader;
