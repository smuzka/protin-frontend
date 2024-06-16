import {useEffect, useState} from "react";
import axios from "axios";
import {getJwtToken} from "../auth/auth";
import {user} from "../types/user";


const MatchedUsersPage = () => {

    const [users, setUsers] = useState<user[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/mutual-matches`, {
                    headers: {
                        Authorization: 'Bearer ' + getJwtToken(),
                    },
                });
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex gap-4 flex-col">
            <h1>Your matches</h1>
            {users ? (
                users.map((user) => {
                    return (
                        <a href={"/user/" + user.id} className="no-underline block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h2><strong>Username:</strong> {user.username}</h2>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Age:</strong> {user.age}</p>
                            <p><strong>Gender:</strong> {user.gender}</p>
                            <p><strong>Experience:</strong> {user.experience}</p>
                            <p><strong>Education:</strong> {user.education}</p>
                            <p><strong>Preferences:</strong> {user.preferences}</p>
                        </a>
                    )
                })
            ) : (
                <p>No matched users</p>
            )}
        </div>
    );
}


export default MatchedUsersPage;