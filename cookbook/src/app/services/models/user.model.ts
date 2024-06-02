export interface UserDetails {

    userId: number
    name: string
    username: string
    email: string
    password: string
    role: string
//   imageId: string; // or imagePath: string; if you store images as files and save paths in the DB

}

function getActiveUser(): UserDetails | null {
    const userJson = sessionStorage.getItem("activeUser");
    if (userJson) {
        return JSON.parse(userJson) as UserDetails;
    }
    return null; // or a default value if needed

}
