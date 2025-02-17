"use client";

import { useEffect, useState } from "react";

export default function Home() {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [permissionGranted, setPermissionGranted] = useState(false);

	// Request notification permission when the user interacts
	const requestNotificationPermission = async () => {
		if ("Notification" in window) {
			const permission = await Notification.requestPermission();
			if (permission === "granted") {
				setPermissionGranted(true);
				console.log("Notification permission granted.");
			} else {
				console.log("Notification permission denied.");
			}
		}
	};

	// Function to send a notification
	const sendNotification = () => {
		if (permissionGranted && "Notification" in window) {
			new Notification("Photo is ready!", {
				body: "The photo has finished loading.",
				icon: "https://picsum.photos/200", // Optional: Add an icon
			});
		}
	};

	// Start the timer when the user grants permission
	const startImageLoading = () => {
		setLoading(true);
		setTimeout(() => {
			setImageUrl(`https://picsum.photos/500?random=${Date.now()}`);
			setLoading(false);
			sendNotification(); // Send notification after image is loaded
		}, 10000);
	};

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			{!permissionGranted ? (
				<button
					onClick={() => {
						requestNotificationPermission();
						startImageLoading();
					}}
					className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
					Enable Notifications & Load Image
				</button>
			) : loading ? (
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
