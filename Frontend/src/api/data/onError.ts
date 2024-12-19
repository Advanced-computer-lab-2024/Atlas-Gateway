import { AxiosError } from "axios";

import { toast } from "@/hooks/use-toast";

export const onError = (error: AxiosError) => {
	toast({
		title: "An error has occured!",
		description: error?.message ?? "Please try again",
		variant: "destructive",
	});
};
