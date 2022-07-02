import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FlightController } from "./flight.controller";
import { FlightService } from "./flight.service";
import { FLIGHT } from "../common/models/models";
import { FlightSchema } from "./schemas/flight.schema";
import { PassengerModule } from "../passenger/passenger.module";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: FLIGHT.name,
        useFactory: () => {
          return FlightSchema.plugin(require("mongoose-autopopulate"));
        },
      },
    ]),
    PassengerModule,
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
