import { toast } from "@/hooks/use-toast";

export const onError = () => {
	toast({
		title: "An error has occured!",
		description: "Please try again",
		variant: "destructive",
	});
};