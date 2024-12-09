# Atlas Gatweay

## Motivation

Atlas Gateway is your ultimate gateway to explore the world. Designed to deliver a seamless experience. The platform serves a wide spectrum of users, including Tourists, Tour Guides, Advertisors, Sellers, and Governors.

It is a way to help users plan their trips. It was designed to be a one-stop solution for all travel-related needs, including itinerary and activity planning, booking flights, arranging transportations, and hotel booking.

Whether you're exploring historic landmarks, relaxing on beaches, or planning family-friendly adventures, this app brings everything together for the perfect trip.

Want to shop for souvenirs and gifts on the go? Our marketplace connects you with local sellers, ensuring you take home cherished memories.

To enhance user satisfaction, the platform also provides features for reviews and complaints, ensuring continuous improvement and a better experience for all.

---
## Badges


![Git badge](https://img.shields.io/badge/Git--%23F05032?style=for-the-badge&logo=Git)
![Express badge](https://img.shields.io/badge/Express-%23000000?style=for-the-badge&logo=Express&logoColor=white)
![Node badge](https://img.shields.io/badge/Node.js-%2343853D?style=for-the-badge&logo=Node.js&logoColor=white)
![React badge](https://img.shields.io/badge/React.js-%2361DAFB?style=for-the-badge&logo=React&logoColor=black)
![Mongo badge](https://img.shields.io/badge/MongoDB-%2347A248?style=for-the-badge&logo=MongoDB&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23F7DF1E?style=for-the-badge&logo=TypeScript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC?style=for-the-badge&logo=Tailwind-CSS&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-%23FF6C37?style=for-the-badge&logo=Postman&logoColor=white)
---

## Build Status

The project is currently under development. The backend is complete, and the frontend is in progress. The project is expected to be completed by the end of the month.

---

## Code Style

The code adheres to clean and modular practices, ensuring readability and maintainability. Following conventions were applied:

- **Frontend:** React,js using TypeScript and Tailwind CSS
- **Backend:** Node.js with Prettier formatting rules
- **Database:** MongoDB with Mongoose
- **Testing:** End-to-end testing and Postman

---

## Screenshots

### Application Interface

<details>
<summary> Login Page</summary>  
![login]()
</details>

<details>
<summary>Home Page</summary>  
![home]()
</details>


<details>
<summary>Itineraries List Page</summary>  
![itineraries_list_page]()
</details>

<details>

<summary>Activities List Page</summary>  

![activities_list_page]()

</details>

<details>
<summary>Hotels and Flights Page</summary>  
	
![apply-filter]()
 
</details>

<details>

<summary>Profile Page</summary>  

![profile]()
 
</details>

<details>

<summary>Admin Page</summary>  

![admin]()
 
</details>

<details>

<summary>Admin Reports</summary>  

![admin_reports]()

</details>

---

## Tech/Framework used

[Git](https://git-scm.com/)

[Node.js](https://nodejs.org/en/)

[Express.js](https://expressjs.com/)

[React](https://reactjs.org/)

[TypeScript](https://www.typescriptlang.org/)

[Tailwind CSS](https://tailwindcss.com/)

[MongoDB](https://www.mongodb.com/)

[Mongoose](https://mongoosejs.com/)

[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

[Postman](https://www.postman.com/)

[VSCode](https://code.visualstudio.com/)

---

## Features

- User authentication and secure session management
- Dynamic trip planning with customizable options
- Payment integration using Stripe
- Mobile-responsive design with Tailwind CSS

## Code Examples

### Backend: Sample API Endpoint

```typescript
const router = express.Router();

router.post("/create", createActivities);

export const createActivities = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const advertisorId = req.headers.userid;
        
        if (!advertisorId) {
        
        throw new HttpError(400, "Tour Guide ID is required");
        }

        const activity = await activityService.createActivity(
			req.body,
			advertisorId.toString(),
		);
		res.status(201).json(activity);
	} catch (error) {
		next(error);
	}
};

export const createActivity = async (
	activity: IActivity,
	createdBy: string,
) => {
	if (!Types.ObjectId.isValid(createdBy)) {
		throw new HttpError(400, "Invalid Advertiser ID");
	}

	// Start a session for transaction management
	const session = await mongoose.startSession();

	try {
		session.startTransaction();

		// Create the new activity
		const newActivity = new Activity({
			...activity,
			createdBy: new Types.ObjectId(createdBy),
		});

		await newActivity.save({ session }); // Save to generate the ID

		// Link activity ID to the advertiser's activities array
		const advertiser = await advertiserService.getAdvertiserById(createdBy);

		if (!advertiser) {
			throw new HttpError(404, "Advertiser not found");
		}

		// Push the new activity ID to the advertiser's activities array
		await advertiser.updateOne(
			{ $push: { activities: newActivity._id } }, // Update data
			{ session }, // Pass session here
		);

		await session.commitTransaction();

		return newActivity;
	} catch (error) {
		await session.abortTransaction();
		throw error;
	} finally {
		session.endSession();
	}
};
```
---

## Installation

1. Clone the Project
```console
> git clone https://github.com/Advanced-computer-lab-2024/Atlas-Gateway/tree/main
```
2. Change directory to Frontend
```console
> cd Frontend
> npm i
> npm run dev
```
3. Create new window and change directory to Backend
```console
> cd backend
> npm i
> npm run dev
```

## Api Refrences 

Our API is available online as a public postman workspace that you can see and fork.


## Tests 


## How To Use


## Contribute

## Credits


## License

The Project is following [MIT License](https://opensource.org/license/mit)

