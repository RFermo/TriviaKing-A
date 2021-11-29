import Header from "../Navigation/Header";
import { useState, useEffect } from "react";
import Axios from "axios";

const Profile = () => {

    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchUserData = async () => {

            try {
                const response = await Axios.get("http://localhost:4000/user/get_profile", {withCredentials: true});
                setUserData(response.data.message);
                setLoading(false); 
            }

            catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchUserData();
        setLoading(true);

    }, []);

    return (
        <div className="min-h-screen bg-purple-900">

            <Header />

            <div className="pt-16">
                <div className="bg-gray-200 px-4 py-3 w-max mx-auto rounded-lg">
                    <h1 className="text-5xl font-inter font-bold">Profile</h1>
                </div>

                <div className="w-85 xl:w-1/2 rounded-lg mx-auto mt-14 bg-yellow-400">

                    { loading && 
                        <div className="animate-spin mx-auto rounded-full h-16 w-16 lg:h-32 lg:w-32 border-b-4 md:border-b-8 border-purple-900"></div>
                    }

                    {userData && 
                        <div>
                            <div className="flex w-85 mx-auto flex-col space-y-4 py-6">
                                <div className="font-inter font-semibold text-lg xl:text-xl">
                                    Username: {userData.username}
                                </div>

                                <div className="border-t-2 border-white"></div>

                                <div className="font-inter font-semibold text-lg xl:text-xl">
                                    Highest score achieved: {userData.highscore}
                                </div>

                                <div className="border-t-2 border-white"></div>

                                <div className="font-inter font-semibold text-lg xl:text-xl">
                                    Questions answered correctly: {userData.num_correct_answers}
                                </div>

                                <div className="border-t-2 border-white"></div>

                                <div className="font-inter font-semibold text-lg xl:text-xl">
                                    Lifelines remaining: {userData.remaining_change_questions + userData.remaining_fifty_fiftys}
                                </div>

                                <div className="border-t-2 border-white"></div>

                                <div className="font-inter font-semibold text-lg xl:text-xl">
                                    Times you have won the game: {userData.times_won}
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};
 
export default Profile;