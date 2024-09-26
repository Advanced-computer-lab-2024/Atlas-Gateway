import { Document, Schema, model , Types} from "mongoose";

interface IItinerary extends Document {
  guideId: Types.ObjectId;
  touristId: Types.ObjectId;
  activities: string[];
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const itinerarySchema = new Schema<IItinerary>({
  guideId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  touristId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  activities: [{ type: Schema.Types.ObjectId, ref: 'Activity', required: true }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Itinerary = model<IItinerary>('Itinerary', itinerarySchema);
