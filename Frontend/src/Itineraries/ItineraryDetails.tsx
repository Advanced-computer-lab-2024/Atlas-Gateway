import { ArrowLeft, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useItinerary } from "@/api/data/useItinerary"; // Ensure this hook is defined and returns the expected data
import Label from "@/components/ui/Label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Flex } from "@/components/ui/flex";

export default function ItineraryDetails() {
    const navigate = useNavigate();
    const { data } = useItinerary(); // Assuming your hook returns loading and error states
    const {
        activities,
        locations,
        timeline,
        duration,
        language,
        price,
        availableDates,
        availableTimes,
        accessibility,
        pickUp,
        dropOff,
    } = data || {};

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading itinerary data.</div>;

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
                            onClick={() => navigate("/itineraries")}
                            size={32}
                        />
                        <Label.Big600>Itinerary Details</Label.Big600>
                    </Flex>

                    <Flex gap="12">
                        <Flex isColumn gap="2" align="start">
                            <Flex gap="2" align="center">
                                <Label.Big600 className="w-40 text-left">Activities:</Label.Big600>
                                <Flex gap="1" align="center" className="overflow-x-scroll">
                                    {activities?.map((activity, index) => (
                                        <Badge key={index} variant="default">
                                            {activity}
                                        </Badge>
                                    ))}
                                </Flex>
                            </Flex>

                            <Flex gap="2" align="center">
                                <Label.Big600 className="w-40 text-left">Locations:</Label.Big600>
                                <Flex gap="1" align="center" className="overflow-x-scroll">
                                    {locations?.map((location, index) => (
                                        <Badge key={index} variant="default">
                                            {location}
                                        </Badge>
                                    ))}
                                </Flex>
                            </Flex>

                            <Flex gap="2" align="center">
                                <Label.Big600 className="w-40 text-left">Duration:</Label.Big600>
                                <Label.Mid500>{duration} hours</Label.Mid500>
                            </Flex>

                            <Flex gap="2" align="center">
                                <Label.Big600 className="w-40 text-left">Language:</Label.Big600>
                                <Label.Mid500>{language}</Label.Mid500>
                            </Flex>

                            <Flex gap="2" align="center">
                                <Label.Big600 className="w-40 text-left">Price:</Label.Big600>
                                <Label.Mid500>
                                    <DollarSign className="inline" /> {price}
                                </Label.Mid500>
                            </Flex>

                            <Flex gap="2" align="center">
                                <Label.Big600 className="w-40 text-left">Available Dates:</Label.Big600>
                                <Flex gap="1" align="center" className="overflow-x-scroll">
                                    {availableDates?.map((date, index) => (
                                        <Badge key={index} variant="default">
                                            {date}
                                        </Badge>
                                    ))}
                                </Flex>
                            </Flex>

                            <Flex gap="2" align="center">
                                <Label.Big600 className="w-40 text-left">Available Times:</Label.Big600>
                                <Flex gap="1" align="center" className="overflow-x-scroll">
                                    {availableTimes?.map((time, index) => (
                                        <Badge key={index} variant="default">
                                            {time}
                                        </Badge>
                                    ))}
                                </Flex>
                            </Flex>

                            <Flex gap="2" align="center">
                                <Label.Big600 className="w-40 text-left">Accessibility:</Label.Big600>
                                <Label.Mid500>{accessibility}</Label.Mid500>
                            </Flex>

                            <Flex gap="2" align="center">
                                <Label.Big600 className="w-40 text-left">Pick-Up:</Label.Big600>
                                <Label.Mid500>{pickUp}</Label.Mid500>
                            </Flex>

                            <Flex gap="2" align="center">
                                <Label.Big600 className="w-40 text-left">Drop-Off:</Label.Big600>
                                <Label.Mid500>{dropOff}</Label.Mid500>
                            </Flex>
                        </Flex>
                    </Flex>

                    <hr />
                    
                    <Flex isColumn gap="2">
                        <Label.Big600>Timeline:</Label.Big600>
                        <Flex isColumn gap="2">
                            {timeline?.map((item, index) => (
                                <Flex key={index} gap="2" align="center">
                                    <Label.Mid500 className="w-[140px] text-left">{item.time}</Label.Mid500>
                                    <Label.Mid200 className="overflow-ellipsis">{item.activity}</Label.Mid200>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    );
}
