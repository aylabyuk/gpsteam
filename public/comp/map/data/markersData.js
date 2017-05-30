import { apolloClient } from '../../../_primary'

//graphql
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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


export const mdata = apolloClient.query({ query: SiteDetailsQuery }).then((res) => { return(res) })
