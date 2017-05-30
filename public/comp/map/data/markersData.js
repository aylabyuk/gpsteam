import { apolloClient } from '../../../_primary'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';


require("babel-core/register");
require("babel-polyfill");

const SiteDetailsQuery = gql`query SiteDetailsQuery {
    allSiteDetail {
        name {
            site_name
        }
        location {
            long
            lat
        }
    }
}`;

let qry = apolloClient.query({ query: SiteDetailsQuery }).then((res) => { return  (res) }) 

async function mdata() {
    let s = await qry
    return s
}

export default mdata
