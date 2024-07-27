/** @format */

import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth"; // Import Firebase Authentication

const navigation = [
	{ name: "Home", href: "/home", current: true },
	{ name: "Gis Crop Analysis", href: "/leafletmap", current: true },
	{ name: "Your farm", href: "/farm", current: true },
	{ name: "weather", href: "/weather", current: true },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Nav() {
	const [notificationsOpen, setNotificationsOpen] = useState(false);
	const [notifications, setNotifications] = useState([
		"Check the irrigation level",
		"high risk for pest",
		"irigation in control",
		"plan for next crop",
		"ai is ready to help you for cropplanning",

		// Add more notifications as needed
	]);
	const auth = getAuth(); // Get Firebase Auth instance
	const navigate = useNavigate();

	// Update notification count based on the length of notifications
	const [notificationCount, setNotificationCount] = useState(
		notifications.length
	);

	useEffect(() => {
		setNotificationCount(notifications.length);
	}, [notifications]);

	const handleLogout = async () => {
		try {
			await signOut(auth); // Sign out using Firebase Auth
			localStorage.clear(); // Clear local storage if needed
			navigate("/"); // Redirect to home page
		} catch (error) {
			console.error("Logout Error:", error.message); // Log any errors
		}
	};

	const toggleNotifications = () => {
		setNotificationsOpen(!notificationsOpen);
	};

	const addNotification = (message) => {
		setNotifications((prevNotifications) => [...prevNotifications, message]);
	};

	return (
		<Disclosure
			as='nav'
			className='bg-white shadow-md'>
			{({ open }) => (
				<>
					<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
						<div className='relative flex h-16 items-center justify-between'>
							<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
								{/* Mobile menu button */}
								<Disclosure.Button className='inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900'>
									<span className='sr-only'>Open main menu</span>
									{open ? (
										<XMarkIcon
											className='h-6 w-6'
											aria-hidden='true'
										/>
									) : (
										<Bars3Icon
											className='h-6 w-6'
											aria-hidden='true'
										/>
									)}
								</Disclosure.Button>
							</div>
							<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
								<div className='flex flex-shrink-0 items-center'>
									<img
										className='h-8 w-auto'
										alt='Company Logo'
									/>
								</div>
								<div className='hidden sm:ml-6 sm:flex sm:space-x-4'>
									{navigation.map((item) => (
										<Link
											key={item.name}
											to={item.href}
											className={classNames(
												item.current
													? "bg-gray-200 text-gray-900"
													: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
												"rounded-md px-4 py-2 text-sm font-medium"
											)}
											aria-current={item.current ? "page" : undefined}>
											{item.name}
										</Link>
									))}
								</div>
							</div>
							<div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
								<button
									type='button'
									className='relative p-1 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900'
									onClick={toggleNotifications}>
									<span className='sr-only'>View notifications</span>
									<BellIcon
										className='h-6 w-6'
										aria-hidden='true'
									/>
									{notificationCount > 0 && (
										<span className='absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full'>
											{notificationCount}
										</span>
									)}
								</button>
								{/* Profile dropdown */}
								<Menu
									as='div'
									className='relative ml-3'>
									<div>
										<Menu.Button className='flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900'>
											<span className='sr-only'>Open user menu</span>
											<img
												className='h-8 w-8 rounded-full'
												src={localStorage.getItem("profileImage")}
												alt='Profile'
											/>
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter='transition ease-out duration-100'
										enterFrom='transform opacity-0 scale-95'
										enterTo='transform opacity-100 scale-100'
										leave='transition ease-in duration-75'
										leaveFrom='transform opacity-100 scale-100'
										leaveTo='transform opacity-0 scale-95'>
										<Menu.Items className='absolute right-0 z-40 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900 ring-opacity-5 focus:outline-none'>
											<Menu.Item>
												{({ active }) => (
													<Link
														to='/profile'
														className={classNames(
															active
																? "bg-gray-100 text-gray-900"
																: "text-gray-700",
															"block px-4 py-2 text-sm"
														)}>
														Your Profile
													</Link>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href='#'
														className={classNames(
															active
																? "bg-gray-100 text-gray-900"
																: "text-gray-700",
															"block px-4 py-2 text-sm"
														)}>
														Settings
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a
														href='#'
														className={classNames(
															active
																? "bg-gray-100 text-gray-900"
																: "text-gray-700",
															"block px-4 py-2 text-sm"
														)}
														onClick={handleLogout}>
														Log out
													</a>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className='sm:hidden'>
						<div className='space-y-1 px-2 pb-3 pt-2'>
							{navigation.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									className='block px-4 py-2 text-base font-medium text-gray-900 bg-gray-100'
									aria-current={item.current ? "page" : undefined}>
									{item.name}
								</Link>
							))}
						</div>
					</Disclosure.Panel>

					{/* Notification Panel */}
					<div
						className={`fixed right-0 top-16 z-30 w-80 bg-white shadow-lg transform ${
							notificationsOpen ? "translate-x-0" : "translate-x-full"
						} transition-transform duration-300 ease-in-out`}>
						<div className='p-4'>
							<h3 className='text-lg font-semibold text-gray-900'>
								Notifications
							</h3>
							{/* Notifications */}
							<ul className='mt-2 space-y-2'>
								{notifications.map((notification, index) => (
									<li
										key={index}
										className='text-sm text-gray-700'>
										{notification}
									</li>
								))}
							</ul>
							<button
								onClick={() => setNotificationsOpen(false)}
								className='absolute top-2 right-2 p-1 text-gray-600 hover:text-gray-900'>
								<XMarkIcon
									className='h-6 w-6'
									aria-hidden='true'
								/>
							</button>
						</div>
					</div>
				</>
			)}
		</Disclosure>
	);
}
