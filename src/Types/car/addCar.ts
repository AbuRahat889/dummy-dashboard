export type addCarForm = {
  numberOfCylinder: number;
  carName: string;
  enginePower: string;
  carModel: string;
  shippingCost: number;
  price: number;
  registrationYear: number;
  customClearanceCost: number;
  mileage: number;
  interiorColor: string;
  exteriorColor: string;
  numberOfSeats: number;
  description: string;
  carVideo: {
    urls: string[];
    files: File[];
  };
  carImages: {
    urls: string[];
    files: File[];
  };
  quantity: number;
  numberOfCylinders: number;
  brandName: string;
};
