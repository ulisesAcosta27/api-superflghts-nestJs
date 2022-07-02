import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { PASSENGER } from "../common/models/models";
import { IPassenger } from "../common/interface/passenger.interface";
import { Model } from "mongoose";
import { PassengerDTO } from "./dto/passenger.dto";

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>
  ) {}

  async create(passengerDTO: PassengerDTO): Promise<IPassenger> {
    const createPassenger = new this.model(passengerDTO);
    return await createPassenger.save();
  }

  async getAll(): Promise<IPassenger[]> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<IPassenger> {
    return await this.model.findById(id);
  }

  async update(id: string, passengerDTO: PassengerDTO): Promise<IPassenger> {
    return await this.model.findByIdAndUpdate(id, passengerDTO, { new: true });
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete({_id: id})
    return { status: HttpStatus.OK, msg: 'Deleted' }
  }
}
