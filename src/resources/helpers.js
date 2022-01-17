export const isLoggedIn = () => {
	return localStorage.getItem( 'token' );
};

export const userEmail = () => {
	return localStorage.getItem( 'userEmail' );
};

export const userName = () => {
	return localStorage.getItem( 'userName' );
};

export const useRole = () => {
	return localStorage.getItem( 'useRole' );
};