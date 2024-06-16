import {useEffect, useState} from "react";
import {User} from "../types/user";
import axios from "axios";
import {getJwtToken} from "../auth/auth";


const RandomUserPage = () => {
    const [profileData, setProfileData] = useState<User>({
        id: 0,
        email: "",
        password: "",
        username: "",
        age: 0,
        gender: "",
        experience: "",
        education: "",
        preferences: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/user-to-match`, {
                    headers: {
                        Authorization: 'Bearer ' + getJwtToken(),
                    },
                });
                setProfileData(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const matchHandler = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/match/${profileData.id}`,
                {},
                {
                    headers: {
                        Authorization: 'Bearer ' + getJwtToken(),
                    },
                });

            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const notMatchHandler = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/not-match/${profileData.id}`,
                {},
                {
                headers: {
                    Authorization: 'Bearer ' + getJwtToken(),
                },
            });
            window.location.reload();
        } catch (error) {
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log(profileData);
    console.log(typeof(profileData));


    return (
        <div className="profile-page">
            <h1>Your potential match:</h1>
            {typeof(profileData) === "object" ? (
                <div>
                    <div className="profile-details">
                        <h2><strong>Username:</strong> {profileData.username}</h2>
                        <p><strong>Age:</strong> {profileData.age}</p>
                        <p><strong>Gender:</strong> {profileData.gender}</p>
                        <p><strong>Experience:</strong> {profileData.experience}</p>
                        <p><strong>Education:</strong> {profileData.education}</p>
                        <p><strong>Preferences:</strong> {profileData.preferences}</p>
                    </div>
                    <div className="flex flex-row gap-4">
                        <button onClick={matchHandler}
                                type="button"
                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Yes
                        </button>
                        <button
                            onClick={notMatchHandler}
                            type="button"
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">No
                        </button>
                    </div>
                </div>
            ) : (
                <p>No profile data available.</p>
            )}
        </div>
    );
}


export default RandomUserPage;