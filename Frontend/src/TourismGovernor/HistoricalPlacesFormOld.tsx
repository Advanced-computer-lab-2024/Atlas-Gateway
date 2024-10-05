import React, { useState } from "react";

const PlacesForm: React.FC = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        openHourSat: '',
        closeHourSat: '',
        openHourSun: '',
        closeHourSun: '',
        openHourMon: '',
        closeHourMon: '',
        openHourTue: '',
        closeHourTue: '',
        openHourWed: '',
        closeHourWed: '',
        openHourThu: '',
        closeHourThu: '',
        openHourFri: '',
        closeHourFri: '',
        ticketsN: '',
        ticketsS: '',
        ticketsF: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [files, setFiles] = useState<FileList | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Check for negative values in number inputs
        if (e.target.type === 'number' && parseFloat(value) < 0) {
            setError('Value cannot be negative.'); 
            return; 
        }

        setError(null); // Clear error message if input is valid
        setValues({ ...values, [name]: value });
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(event.target.files);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        //validate that opening hours are not larger that closing hours

        //pass values to DB
        // axios.post('url', values);
        console.log(values);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                console.log(files[i]); // Handle the files as needed
            }
        }

        setValues({
            name: '',
            description: '',
            openHourSat: '',
            closeHourSat: '',
            openHourSun: '',
            closeHourSun: '',
            openHourMon: '',
            closeHourMon: '',
            openHourTue: '',
            closeHourTue: '',
            openHourWed: '',
            closeHourWed: '',
            openHourThu: '',
            closeHourThu: '',
            openHourFri: '',
            closeHourFri: '',
            ticketsN: '',
            ticketsS: '',
            ticketsF: ''
        });
        
        setFiles(null);
    };

    return (
        <div className="container bg-white text-center p-10 rounded-lg shadow-lg mx-auto mt-20 max-w-md">
            <h1 className="text-blue-700 text-2xl font-bold mb-6">New Place</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-left mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter the place name"
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="description" className="text-left mb-1">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        cols={30}
                        rows={10}
                        onChange={handleChange}
                        required
                        placeholder="Enter the place description"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="pictures" className="text-left mb-1">Pictures</label>
                    <input
                        type="file"
                        id="pictures"
                        name="pictures"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        required
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="openHoursSat" className="text-left mb-1">Saturday opens at</label>
                    <select
                        id="hour1"
                        name="openHourSat"
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="6">6 AM</option>
                        <option value="7">7 AM</option>
                        <option value="8">8 AM</option>
                        <option value="9">9 AM</option>
                        <option value="10">10 AM</option>
                        <option value="11">11 AM</option>
                        <option value="12">12 PM</option>
                        <option value="13">1 PM</option>
                        <option value="14">2 PM</option>
                        <option value="15">3 PM</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="closeHoursSat" className="text-left mb-1">Saturday closes at</label>
                    <select
                        name="closeHourSat"
                        id="hour2"
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="6">6 PM</option>
                        <option value="7">7 PM</option>
                        <option value="8">8 PM</option>
                        <option value="9">9 PM</option>
                        <option value="10">10 PM</option>
                        <option value="11">11 PM</option>
                        <option value="12">12 AM</option>
                        <option value="13">1 AM</option>
                        <option value="14">2 AM</option>
                        <option value="15">3 AM</option>
                    </select>
                </div><div className="flex flex-col">
                    <label htmlFor="openHoursSun" className="text-left mb-1">Sunday opens at</label>
                    <select
                        id="hour3"
                        name="openHourSun"
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="6">6 AM</option>
                        <option value="7">7 AM</option>
                        <option value="8">8 AM</option>
                        <option value="9">9 AM</option>
                        <option value="10">10 AM</option>
                        <option value="11">11 AM</option>
                        <option value="12">12 PM</option>
                        <option value="13">1 PM</option>
                        <option value="14">2 PM</option>
                        <option value="15">3 PM</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="closeHoursSun" className="text-left mb-1">Sunday closes at</label>
                    <select
                        name="closeHourSun"
                        id="hour4"
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="6">6 PM</option>
                        <option value="7">7 PM</option>
                        <option value="8">8 PM</option>
                        <option value="9">9 PM</option>
                        <option value="10">10 PM</option>
                        <option value="11">11 PM</option>
                        <option value="12">12 AM</option>
                        <option value="13">1 AM</option>
                        <option value="14">2 AM</option>
                        <option value="15">3 AM</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="openHoursMon" className="text-left mb-1">Monday opens at</label>
                    <select
                        id="hour5"
                        name="openHourMon"
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="6">6 AM</option>
                        <option value="7">7 AM</option>
                        <option value="8">8 AM</option>
                        <option value="9">9 AM</option>
                        <option value="10">10 AM</option>
                        <option value="11">11 AM</option>
                        <option value="12">12 PM</option>
                        <option value="13">1 PM</option>
                        <option value="14">2 PM</option>
                        <option value="15">3 PM</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="closeHoursMon" className="text-left mb-1">Monday closes at</label>
                    <select
                        name="closeHourMon"
                        id="hour6"
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="6">6 PM</option>
                        <option value="7">7 PM</option>
                        <option value="8">8 PM</option>
                        <option value="9">9 PM</option>
                        <option value="10">10 PM</option>
                        <option value="11">11 PM</option>
                        <option value="12">12 AM</option>
                        <option value="13">1 AM</option>
                        <option value="14">2 AM</option>
                        <option value="15">3 AM</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="openHoursTue" className="text-left mb-1">Tuesday opens at</label>
                    <select
                        id="hour7"
                        name="openHourTue"
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="6">6 AM</option>
                        <option value="7">7 AM</option>
                        <option value="8">8 AM</option>
                        <option value="9">9 AM</option>
                        <option value="10">10 AM</option>
                        <option value="11">11 AM</option>
                        <option value="12">12 PM</option>
                        <option value="13">1 PM</option>
                        <option value="14">2 PM</option>
                        <option value="15">3 PM</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="closeHoursTue" className="text-left mb-1">Tuesday closes at</label>
                    <select
                        name="closeHourTue"
                        id="hour8"
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="6">6 PM</option>
                        <option value="7">7 PM</option>
                        <option value="8">8 PM</option>
                        <option value="9">9 PM</option>
                        <option value="10">10 PM</option>
                        <option value="11">11 PM</option>
                        <option value="12">12 AM</option>
                        <option value="13">1 AM</option>
                        <option value="14">2 AM</option>
                        <option value="15">3 AM</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="openHoursWed" className="text-left mb-1">Wednesday opens at</label>
                    <select
                        id="hour9"
                        name="openHourWed"
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="6">6 AM</option>
                        <option value="7">7 AM</option>
                        <option value="8">8 AM</option>
                        <option value="9">9 AM</option>
                        <option value="10">10 AM</option>
                        <option value="11">11 AM</option>
                        <option value="12">12 PM</option>
                        <option value="13">1 PM</option>
                        <option value="14">2 PM</option>
                        <option value="15">3 PM</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="closeHoursWed" className="text-left mb-1">Wednesday closes at</label>
                    <select
                        name="closeHourWed"
                        id="hour10"
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="6">6 PM</option>
                        <option value="7">7 PM</option>
                        <option value="8">8 PM</option>
                        <option value="9">9 PM</option>
                        <option value="10">10 PM</option>
                        <option value="11">11 PM</option>
                        <option value="12">12 AM</option>
                        <option value="13">1 AM</option>
                        <option value="14">2 AM</option>
                        <option value="15">3 AM</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="openHoursThu" className="text-left mb-1">Thursday opens at</label>
                    <select
                        id="hour11"
                        name="openHourThu"
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="6">6 AM</option>
                        <option value="7">7 AM</option>
                        <option value="8">8 AM</option>
                        <option value="9">9 AM</option>
                        <option value="10">10 AM</option>
                        <option value="11">11 AM</option>
                        <option value="12">12 PM</option>
                        <option value="13">1 PM</option>
                        <option value="14">2 PM</option>
                        <option value="15">3 PM</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="closeHoursThu" className="text-left mb-1">Thursday closes at</label>
                    <select
                        name="closeHourThu"
                        id="hour12"
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="6">6 PM</option>
                        <option value="7">7 PM</option>
                        <option value="8">8 PM</option>
                        <option value="9">9 PM</option>
                        <option value="10">10 PM</option>
                        <option value="11">11 PM</option>
                        <option value="12">12 AM</option>
                        <option value="13">1 AM</option>
                        <option value="14">2 AM</option>
                        <option value="15">3 AM</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="openHoursFri" className="text-left mb-1">Friday opens at</label>
                    <select
                        id="hour13"
                        name="openHourFri"
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="6">6 AM</option>
                        <option value="7">7 AM</option>
                        <option value="8">8 AM</option>
                        <option value="9">9 AM</option>
                        <option value="10">10 AM</option>
                        <option value="11">11 AM</option>
                        <option value="12">12 PM</option>
                        <option value="13">1 PM</option>
                        <option value="14">2 PM</option>
                        <option value="15">3 PM</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="closeHoursFri" className="text-left mb-1">Friday closes at</label>
                    <select
                        name="closeHourFri"
                        id="hour14"
                        required
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="6">6 PM</option>
                        <option value="7">7 PM</option>
                        <option value="8">8 PM</option>
                        <option value="9">9 PM</option>
                        <option value="10">10 PM</option>
                        <option value="11">11 PM</option>
                        <option value="12">12 AM</option>
                        <option value="13">1 AM</option>
                        <option value="14">2 AM</option>
                        <option value="15">3 AM</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="ticketPrice" className="text-left mb-1">Natives ticket price </label>
                    <input
                        type="number"
                        name="ticketsN"
                        id="ticketPriceNatives"
                        placeholder="Enter ticket price for natives"
                        onChange={handleChange}
                        required
                        step="0.01"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="ticketPrice" className="text-left mb-1">Students ticket price </label>
                    <input
                        type="number"
                        name="ticketsS"
                        onChange={handleChange}
                        id="ticketPriceStudents"
                        placeholder="Enter ticket price for students"
                        required
                        step="0.01"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="ticketPriceForeigners" className="text-left mb-1">Foreigners ticket price </label>
                    <input
                        type="number"
                        name="ticketsF"
                        id="ticketPriceForeigns"
                        onChange={handleChange}
                        placeholder="Enter ticket price for foreigners"
                        required
                        step="0.01"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Error!</strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Submit
                </button>
            </form>
        </div>

    );
};

export default PlacesForm;
