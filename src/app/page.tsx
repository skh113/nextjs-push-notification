"use client";

import { useEffect, useState } from "react";

export default function Home() {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	// Function to request notification permission
	const requestNotificationPermission = async () => {
		if ("Notification" in window) {
			const permission = await Notification.requestPermission();
			if (permission === "granted") {
				console.log("Notification permission granted.");
			} else {
				console.log("Notification permission denied.");
			}
		}
	};

	// Function to send the notification
	const sendNotification = () => {
		if (Notification.permission === "granted") {
			new Notification("Photo is ready!", {
				body: "The photo has finished loading.",
				icon: "https://picsum.photos/200", // Optional: Add an icon
			});
		}
	};

	useEffect(() => {
		// Request notification permission when the component is mounted
		requestNotificationPermission();

		const interval = setInterval(() => {
			setImageUrl(`https://picsum.photos/500?random=${Date.now()}`);
			setLoading(false); // Set loading to false after 10 seconds
			sendNotification(); // Send a notification after the photo is ready
		}, 10000);

		return () => clearInterval(interval); // Cleanup interval on unmount
	}, []);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			{loading ? (
				<p>Loading photo...</p> // Show loading text
			) : (
				<img
					src={imageUrl!}
					alt="Random from Picsum"
					className="w-[500px] h-auto rounded-lg shadow-lg"
				/>
			)}
		</div>
	);
}
