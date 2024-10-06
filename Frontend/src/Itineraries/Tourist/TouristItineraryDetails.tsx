import { ArrowLeft, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useTouristItinerary } from "@/api/data/useTouristItinerary";
import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";

export default function TouristItineraryDetails() {
    const navigate = useNavigate();
    const { data } = useTouristItinerary();
    const {
        activities,
        locations,
        dateRange,
        tags
    } = data || {};

    return (
        <Flex
            isColumn
            gap="4"
            align="center"
            className="px-4 py-4 overflow-y-scroll"
        >
            <Card className="w-[80%] flex-col border-surface-secondary border-2 p-4">
                <Flex isColumn gap="4">
                    <Flex gap="2" align="center">
                        <ArrowLeft
                            className="cursor-pointer"
                            onClick={() => navigate("/activities")}
                            size={32}
                        />
                        <Label.Big600>Activities Details</Label.Big600>
                    </Flex>
                    
                    <Flex gap="12">
                        <Flex isColumn justify="around">
                            <Flex gap="2" align="center">
                                <Label.Big600 className="w-40 text-left">
                                    Activities:
                                </Label.Big600>
                                <Flex gap="1" align="center" className="overflow-x-scroll">
                                    {activities?.map((activity, index) => (
                                        <Badge key={index} variant="default">
                                            {activity}
                                        </Badge>
                                    ))}
                                </Flex>
                            </Flex>

                            <Flex gap="2" align="center">
                                <Label.Big600 className="w-40 text-left">
                                    Locations:
                                </Label.Big600>
                                <Flex gap="1" align="center" className="overflow-x-scroll">
                                    {locations?.map((location, index) => (
                                        <Badge key={index} variant="default">
                                            {location}
                                        </Badge>
                                    ))}
                                </Flex>
                            </Flex>

                            <Flex gap="2" align="center">
                                <Label.Big600 className="w-40 text-left">
                                    Date Range:
                                </Label.Big600>
                                <Label.Mid500>{dateRange?.from} - {dateRange?.to}</Label.Mid500>
                            </Flex>

                            <Flex gap="2" align="center">
                                <Label.Big600 className="w-40 text-left">
                                    Tags:
                                </Label.Big600>
                                {tags && tags.length > 0 ? (
                                    <Flex gap="1" align="center" className="overflow-x-scroll w-full">
                                        {tags.map((tag, index) => (
                                            <Badge key={index} variant="default">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </Flex>
                                ) : (
                                    <Label.Mid500>N/A</Label.Mid500>
                                )}
                            </Flex>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    );
}
