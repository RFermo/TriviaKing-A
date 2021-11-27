import Header from "../Navigation/Header";

const Profile = () => {

    // Need to fetch username, questions answered correctly, lifelines remaining, highest score achieved.

    return (
        <div className="min-h-screen bg-purple-900">

            <Header />

            <div className="pt-16">
                <div className="bg-gray-200 px-4 py-3 w-max mx-auto rounded-lg">
                    <h1 className="text-5xl font-inter font-bold">Profile</h1>
                </div>

                <div className="w-85 xl:w-1/2 rounded-lg mx-auto mt-14 bg-yellow-400">
                    <div className="flex w-85 mx-auto flex-col space-y-4 py-6">
                        <div className="font-inter font-semibold text-lg xl:text-xl">
                            Username: RFermo_98
                        </div>

                        <div className="border-t-2 border-white"></div>

                        <div className="font-inter font-semibold text-lg xl:text-xl">
                           Questions answered correctly: 13
                        </div>

                        <div className="border-t-2 border-white"></div>

                        <div className="font-inter font-semibold text-lg xl:text-xl">
                           Lifelines remaining: 6
                        </div>

                        <div className="border-t-2 border-white"></div>

                        <div className="font-inter font-semibold text-lg xl:text-xl">
                           Highest score achieved: 4
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default Profile;