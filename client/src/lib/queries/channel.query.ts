import { gql } from 'graphql-request';

export const GET_CHANNELS = gql`
	query Channels($pageInfo: PageInfo!) {
		channels(pageInfo: $pageInfo) {
			id
			name
		}
	}
`;
