import gql from 'graphql-tag';

// For more information about graphql or apollo visit
// http://graphql.org/learn/ and http://dev.apollodata.com/react/

// Large queries are placed here

// querying a single logsheet using the id as parameter
export const SingleLogsheetQuery = gql` query SingleLogsheet($currentLogsheet: ID) {
        singleLogsheet(id: $currentLogsheet) {
            id
            survey_type
            logsheet_date
            julian_day
            location
            marker
            observers {
                id
                first_name
                last_name
                nickname
            }
            site {
                name
            }
            north
            east
            south
            west
            time_start
            time_end
            azimuth
            failure_time
            receiver_status
            antenna_status
            avg_slant_height
            observed_situation
            lodging_road_information
            others
            antenna {
                serial_number
                type
                part_number
            }
            receiver {
                serial_number
                type
                part_number
            }
            rod_num
            rod_correction
            ip_add
            netmask
            gateway
            dns
            local_tcp_port
            latitude
            longitude
            contact {
                id
                first_name
                last_name
                email_add
                contact_number
            }
        }
    } 
`

// the mutation for creating new logsheet entry
export const addNewLogSheet = gql`
    mutation createLogsheet(
        $survey_type: String!
        $logsheet_date: Date!
        $julian_day: Int
        $location: String!
        $marker: String
        $observers: [StaffIdInput]!
        $siteId: Int!
        $north: Float!
        $east: Float!
        $south: Float!
        $west: Float!
        $time_start: String
        $time_end: String
        $azimuth: Int
        $failure_time: String
        $receiver_status: String
        $antenna_status: String
        $rod_num: Int
        $rod_correction: Int
        $avg_slant_height: Float
        $ip_add: String
        $netmask: String
        $gateway: String
        $dns: String
        $local_tcp_port: String
        $latitude: Float
        $longitude: Float
        $observed_situation: String
        $lodging_road_information: String
        $others: String
        $antennaId: String!
        $receiverId: String!
        $contactPersonId: Int
  ) {
        newLogSheet: createLogsheet(input: {
            survey_type: $survey_type
            logsheet_date: $logsheet_date
            julian_day: $julian_day
            marker: $marker
            location: $location
            observers: $observers
            siteId: $siteId
            north: $north
            east: $east
            south: $south
            west: $west
            time_start: $time_start
            time_end: $time_end
            azimuth: $azimuth
            failure_time: $failure_time
            receiver_status: $receiver_status
            antenna_status: $antenna_status
            rod_num: $rod_num
            rod_correction: $rod_correction
            avg_slant_height: $avg_slant_height
            ip_add: $ip_add
            netmask: $netmask
            gateway: $gateway
            dns: $dns
            local_tcp_port: $local_tcp_port
            latitude: $latitude
            longitude: $longitude
            observed_situation: $observed_situation
            lodging_road_information: $lodging_road_information
            others: $others
            antennaId: $antennaId
            receiverId: $receiverId
            contactPersonId: $contactPersonId
        }) {
            survey_type
            logsheet_date
            julian_day
            location
            marker
            observers {
                first_name
                last_name
                nickname
            }
            site {
                name
            }
            north
            east
            south
            west
            time_start
            time_end
            azimuth
            failure_time
            receiver_status
            antenna_status
            avg_slant_height
            observed_situation
            lodging_road_information
            others
            antenna {
                serial_number
                type
                part_number
            }
            receiver {
                serial_number
                type
                part_number
            }
            contact {
                first_name
                last_name
            }
        }
    }
`

// mutation for updating logsheet info
export const updateLogSheet = gql`
    mutation updateLogsheet(
        $id: Int!
        $survey_type: String!
        $logsheet_date: Date!
        $julian_day: Int
        $location: String!
        $marker: String
        $observers: [StaffIdInput]!
        $siteId: Int!
        $north: Float!
        $east: Float!
        $south: Float!
        $west: Float!
        $time_start: String
        $time_end: String
        $azimuth: Int
        $failure_time: String
        $receiver_status: String
        $antenna_status: String
        $rod_num: Int
        $rod_correction: Int
        $avg_slant_height: Float
        $ip_add: String
        $netmask: String
        $gateway: String
        $dns: String
        $local_tcp_port: String
        $latitude: Float
        $longitude: Float
        $observed_situation: String
        $lodging_road_information: String
        $others: String
        $antennaId: String!
        $receiverId: String!
        $contactPersonId: Int
  ) {
        updateLogsheet: updateLogsheet(input: {
            id: $id
            survey_type: $survey_type
            logsheet_date: $logsheet_date
            julian_day: $julian_day
            marker: $marker
            location: $location
            observers: $observers
            siteId: $siteId
            north: $north
            east: $east
            south: $south
            west: $west
            time_start: $time_start
            time_end: $time_end
            azimuth: $azimuth
            failure_time: $failure_time
            receiver_status: $receiver_status
            antenna_status: $antenna_status
            rod_num: $rod_num
            rod_correction: $rod_correction
            avg_slant_height: $avg_slant_height
            ip_add: $ip_add
            netmask: $netmask
            gateway: $gateway
            dns: $dns
            local_tcp_port: $local_tcp_port
            latitude: $latitude
            longitude: $longitude
            observed_situation: $observed_situation
            lodging_road_information: $lodging_road_information
            others: $others
            antennaId: $antennaId
            receiverId: $receiverId
            contactPersonId: $contactPersonId
        }) {
            id
            survey_type
            logsheet_date
            julian_day
            location
            marker
            observers {
                first_name
                last_name
                nickname
            }
            site {
                name
            }
            north
            east
            south
            west
            time_start
            time_end
            azimuth
            failure_time
            receiver_status
            antenna_status
            avg_slant_height
            observed_situation
            lodging_road_information
            others
            antenna {
                serial_number
                type
                part_number
            }
            receiver {
                serial_number
                type
                part_number
            }
            contact {
                first_name
                last_name
            }
        }
    }
`

// use this to check for duplicate logsheet
export const checkDuplicate = gql`
    query checkDuplicateLogsheetEntry( $name: String!, $date: Date!)
    {
        possibleDuplicate: checkDuplicateLogsheetEntry(name: $name, date: $date) {
            name
            logsheets {
                id
                logsheet_date
            }
        }
    }
`