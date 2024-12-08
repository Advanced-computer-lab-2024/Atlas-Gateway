# Atlas Gatweay

## Motivation

Atlas Gateway is your ultimate gateway to explore the world. Designed to deliver a seamless experience. The platform serves a wide spectrum of users, including Tourists, Tour Guides, Advertisors, Sellers, and Governors.

It is a way to help users plan their trips. It was designed to be a one-stop solution for all travel-related needs, including itinerary and activity planning, booking flights, arranging transportations, and hotel booking.

Whether you're exploring historic landmarks, relaxing on beaches, or planning family-friendly adventures, this app brings everything together for the perfect trip.

Want to shop for souvenirs and gifts on the go? Our marketplace connects you with local sellers, ensuring you take home cherished memories.

To enhance user satisfaction, the platform also provides features for reviews and complaints, ensuring continuous improvement and a better experience for all.

## Badges

![Github Actions badge](https://img.shields.io/badge/Github-Actions-%232088FF?style=for-the-badge&logo=GithubActions)
![Git badge](https://img.shields.io/badge/Git--%23F05032?style=for-the-badge&logo=Git)
![Express badge](https://img.shields.io/badge/Express-%23000000?style=for-the-badge&logo=Express&logoColor=white)
![Node badge](https://img.shields.io/badge/Node.js-%2343853D?style=for-the-badge&logo=Node.js&logoColor=white)
![React badge](https://img.shields.io/badge/React.js-%2361DAFB?style=for-the-badge&logo=React&logoColor=black)
![Mongo badge](https://img.shields.io/badge/MongoDB-%2347A248?style=for-the-badge&logo=MongoDB&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23F7DF1E?style=for-the-badge&logo=TypeScript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC?style=for-the-badge&logo=Tailwind-CSS&logoColor=white)
---

## Build Status

The project is currently under development. The frontend and backend are being built simultaneously, with the goal of integrating them into a fully functional application.

## Code Style

The code adheres to clean and modular practices, ensuring readability and maintainability. Following conventions were applied:

- **Frontend:** React,js using TypeScript and Tailwind CSS
- **Backend:** Node.js with Prettier formatting rules
- **Database:** MongoDB with Mongoose
- **Testing:** No idea

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
<summary>Appointments Page</summary>  
![appointments]()
</details>

<details>

<summary> Health Package Page</summary>  
	
 ![health-package](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/102627389/ef6c952f-107a-4438-8462-f74652dc8ffa)
 
</details>

<details>
<summary>Apply Filter on doctors</summary>  
	
![apply-filter](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/102627389/a8b3508f-52dd-4e17-8292-48c788667916)
 
</details>

<details>

<summary>Patient Adding family members</summary>  
	
![add-member](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/102627389/e11252e9-487b-4b4f-b33e-efa325a854fb)
 
</details>

<details>

<summary>Doctor Receiving Notification</summary>  
	
![notification](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/102627389/f2a8d218-3002-4d7e-9129-25b537392adb)
 
</details>

<details>

<summary>Admin Viewing Requests</summary>  
	
![requests](https://github.com/advanced-computer-lab-2023/poly-medica-Clinic/assets/102627389/b7643d4d-ac7b-4d18-b2e8-8f5b0fb9e84b)

</details>


## Tech/Framework Used

- **Frontend:** React, Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **APIs:** Stripe API for payment handling

## Features

- User authentication and secure session management
- Dynamic trip planning with customizable options
- Payment integration using Stripe
- Mobile-responsive design with Tailwind CSS

## Code Examples

### Backend: Sample API Endpoint

```javascript
app.post('/api/checkout', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: req.body.items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });
        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
