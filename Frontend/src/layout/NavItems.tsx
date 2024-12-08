import React from "react";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { EAccountType } from "@/types/enums";

import {
	activitiesRoute,
	flightsRoute,
	hotelsRoute,
	intinerariesRoute,
	placesRoute,
	productsRoute,
	transportationRoute,
} from "./routes";

export const TouristNavItems = () => (
	<NavigationMenu>
		<NavigationMenuList>
			<NavigationMenuItem>
				<NavigationMenuTrigger>Travel</NavigationMenuTrigger>
				<NavigationMenuContent>
					<ul className="grid gap-3 p-3 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
						{[intinerariesRoute, placesRoute, activitiesRoute].map(
							(route) => (
								<ListItem href={route.to} title={route.name}>
									{route.description}
								</ListItem>
							),
						)}
					</ul>
				</NavigationMenuContent>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuTrigger>Transport</NavigationMenuTrigger>
				<NavigationMenuContent>
					<ul className="grid gap-3 p-3 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
						{[flightsRoute, hotelsRoute, transportationRoute].map((route) => (
							<ListItem href={route.to} title={route.name}>
								{route.description}
							</ListItem>
						))}
					</ul>
				</NavigationMenuContent>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<a
						className={cn(
							navigationMenuTriggerStyle(),
							"block select-none text-black rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						)}
						href={productsRoute.to}
					>
						<div className="text-sm font-medium leading-none">
							{productsRoute.name}
						</div>
					</a>
				</NavigationMenuLink>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
);

export const TourguideNavItems = () => (
	<NavigationMenu>
		<NavigationMenuList>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<a
						className={cn(
							navigationMenuTriggerStyle(),
							"block select-none text-black rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						)}
						href={placesRoute.to}
					>
						<div className="text-sm font-medium leading-none">
							{placesRoute.name}
						</div>
					</a>
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<a
						className={cn(
							navigationMenuTriggerStyle(),
							"block select-none text-black rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						)}
						href={activitiesRoute.to}
					>
						<div className="text-sm font-medium leading-none">
							{activitiesRoute.name}
						</div>
					</a>
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<a
						className={cn(
							navigationMenuTriggerStyle(),
							"block select-none text-black rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						)}
						href={intinerariesRoute.to}
					>
						<div className="text-sm font-medium leading-none">
							{intinerariesRoute.name}
						</div>
					</a>
				</NavigationMenuLink>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
);

export const AdvertiserNavItems = () => (
	<NavigationMenu>
		<NavigationMenuList>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<a
						className={cn(
							navigationMenuTriggerStyle(),
							"block select-none text-black rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						)}
						href={intinerariesRoute.to}
					>
						<div className="text-sm font-medium leading-none">
							{intinerariesRoute.name}
						</div>
					</a>
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<a
						className={cn(
							navigationMenuTriggerStyle(),
							"block select-none text-black rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						)}
						href={activitiesRoute.to}
					>
						<div className="text-sm font-medium leading-none">
							{activitiesRoute.name}
						</div>
					</a>
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<a
						className={cn(
							navigationMenuTriggerStyle(),
							"block select-none text-black rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						)}
						href={placesRoute.to}
					>
						<div className="text-sm font-medium leading-none">
							{placesRoute.name}
						</div>
					</a>
				</NavigationMenuLink>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
);

export const TransporationAdvertisterNavItems = () => (
	<NavigationMenu>
		<NavigationMenuList>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<a
						className={cn(
							navigationMenuTriggerStyle(),
							"block select-none text-black rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						)}
						href={transportationRoute.to}
					>
						<div className="text-sm font-medium leading-none">
							{transportationRoute.name}
						</div>
					</a>
				</NavigationMenuLink>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
);

export const GuestNavItems = () => (
	<NavigationMenu>
		<NavigationMenuList>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<a
						className={cn(
							navigationMenuTriggerStyle(),
							"block select-none text-black rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						)}
						href={placesRoute.to}
					>
						<div className="text-sm font-medium leading-none">
							{placesRoute.name}
						</div>
					</a>
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<a
						className={cn(
							navigationMenuTriggerStyle(),
							"block select-none text-black rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						)}
						href={activitiesRoute.to}
					>
						<div className="text-sm font-medium leading-none">
							{activitiesRoute.name}
						</div>
					</a>
				</NavigationMenuLink>
			</NavigationMenuItem>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<a
						className={cn(
							navigationMenuTriggerStyle(),
							"block select-none text-black rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						)}
						href={intinerariesRoute.to}
					>
						<div className="text-sm font-medium leading-none">
							{intinerariesRoute.name}
						</div>
					</a>
				</NavigationMenuLink>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
);

export const TourismGovernerNavItems = () => (
	<NavigationMenu>
		<NavigationMenuList>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<a
						className={cn(
							navigationMenuTriggerStyle(),
							"block select-none text-black rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						)}
						href={placesRoute.to}
					>
						<div className="text-sm font-medium leading-none">
							{placesRoute.name}
						</div>
					</a>
				</NavigationMenuLink>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
);

export const SellerNavItems = () => (
	<NavigationMenu>
		<NavigationMenuList>
			<NavigationMenuItem>
				<NavigationMenuLink asChild>
					<a
						className={cn(
							navigationMenuTriggerStyle(),
							"block select-none text-black rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						)}
						href={productsRoute.to}
					>
						<div className="text-sm font-medium leading-none">
							{productsRoute.name}
						</div>
					</a>
				</NavigationMenuLink>
			</NavigationMenuItem>
		</NavigationMenuList>
	</NavigationMenu>
);

export const accountNavItems: Record<EAccountType, JSX.Element> = {
	[EAccountType.Tourist]: <TouristNavItems />,
	[EAccountType.Seller]: <SellerNavItems />,
	[EAccountType.Admin]: <TouristNavItems />,
	[EAccountType.Guide]: <TourguideNavItems />,
	[EAccountType.Advertiser]: <AdvertiserNavItems />,
	[EAccountType.TourismGovernor]: <TourismGovernerNavItems />,
	[EAccountType.Guest]: <GuestNavItems />,
	[EAccountType.TransportationAdvertiser]: (
		<TransporationAdvertisterNavItems />
	),
};

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none text-black space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">
						{title}
					</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
