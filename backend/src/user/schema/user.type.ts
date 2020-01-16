import { gql } from "apollo-server";

const userType = gql`
	type User {
		id: String
		name: String
	}
`;

export { userType };